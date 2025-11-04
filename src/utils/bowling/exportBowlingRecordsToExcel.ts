import * as XLSX from "xlsx";
import { Dayjs } from "dayjs";
import { PersonalBowlingRecord } from "src/types/api/bowling";
import { BRANCH_LOOKUP_TABLE } from "src/constants/branches";
import { RESPONSIBILITY_LOOKUP_TABLE } from "src/constants/responsibility";

export function exportBowlingRecordsToExcel(
  data: PersonalBowlingRecord[],
  generationNumber: number | undefined,
  startDate: Dayjs | null,
  endDate: Dayjs | null
) {
  if (!data || data.length === 0) {
    return;
  }

  const dateGameMap = new Map<string, number[]>();

  data.forEach((record) => {
    record.records.forEach((dailyRecord) => {
      const existingGames = dateGameMap.get(dailyRecord.date) || [];
      dailyRecord.games.forEach((game) => {
        if (!existingGames.includes(game.index)) {
          existingGames.push(game.index);
        }
      });
      dateGameMap.set(
        dailyRecord.date,
        existingGames.sort((a, b) => a - b)
      );
    });
  });

  const sortedDates = Array.from(dateGameMap.keys()).sort();

  const rankCounts = new Map<number, number>();
  data.forEach((record) => {
    const count = rankCounts.get(record.rank) || 0;
    rankCounts.set(record.rank, count + 1);
  });

  const baseHeaders = ["순위", "등급", "지구대", "이름", "에버", "게임수", "하이"];
  const headerRow1: string[] = [...baseHeaders];
  const headerRow2: (string | null)[] = new Array(baseHeaders.length).fill(null);

  sortedDates.forEach((date) => {
    const games = dateGameMap.get(date) || [];
    headerRow1.push(date);
    for (let i = 1; i < games.length; i++) {
      headerRow1.push("");
    }
    games.forEach((gameIndex) => {
      headerRow2.push(String(gameIndex));
    });
  });

  const dataRows = data.map((record) => {
    const row: (string | number)[] = [
      record.rank,
      RESPONSIBILITY_LOOKUP_TABLE[record.profile.responsibility] || record.profile.responsibility,
      BRANCH_LOOKUP_TABLE[record.profile.branch],
      record.profile.name,
      Number(record.average.toFixed(2)),
      record.numGames,
      record.high,
    ];

    sortedDates.forEach((date) => {
      const games = dateGameMap.get(date) || [];
      const dailyRecord = record.records.find((r) => r.date === date);

      games.forEach((gameIndex) => {
        const game = dailyRecord?.games.find((g) => g.index === gameIndex);
        row.push(game ? game.score : "");
      });
    });

    return row;
  });

  const sheetData = [headerRow1, headerRow2, ...dataRows];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  const merges: XLSX.Range[] = [];

  for (let col = 0; col < baseHeaders.length; col++) {
    merges.push({
      s: { r: 0, c: col },
      e: { r: 1, c: col },
    });
  }

  let currentCol = baseHeaders.length;
  sortedDates.forEach((date) => {
    const games = dateGameMap.get(date) || [];
    if (games.length > 0) {
      merges.push({
        s: { r: 0, c: currentCol },
        e: { r: 0, c: currentCol + games.length - 1 },
      });
      currentCol += games.length;
    }
  });

  ws["!merges"] = merges;

  data.forEach((record, rowIndex) => {
    const excelRow = rowIndex + 2; // 헤더 2행 + 0-based index

    const rankCell = XLSX.utils.encode_cell({ r: excelRow, c: 0 });
    const isTied = (rankCounts.get(record.rank) || 0) > 1;
    if (ws[rankCell]) {
      ws[rankCell].s = {
        font: { bold: isTied },
      };
    }

    const nameCell = XLSX.utils.encode_cell({ r: excelRow, c: 3 });
    if (ws[nameCell]) {
      ws[nameCell].s = {
        font: { bold: true },
      };
    }

    const averageCell = XLSX.utils.encode_cell({ r: excelRow, c: 4 });
    if (ws[averageCell]) {
      ws[averageCell].s = {
        font: { bold: true },
      };
    }

    const numGamesCell = XLSX.utils.encode_cell({ r: excelRow, c: 5 });
    if (ws[numGamesCell] && record.numGames < 5) {
      ws[numGamesCell].s = {
        font: { color: { rgb: "FF0000" } },
      };
    }
  });

  let borderCol = baseHeaders.length;
  sortedDates.forEach((date) => {
    const games = dateGameMap.get(date) || [];
    if (games.length > 0) {
      for (let rowIndex = 0; rowIndex < sheetData.length; rowIndex++) {
        const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: borderCol });
        if (ws[cellAddress]) {
          const existingStyle = ws[cellAddress].s || {};
          ws[cellAddress].s = {
            ...existingStyle,
            border: {
              ...(existingStyle.border || {}),
              left: { style: "medium" },
            },
          };
        }
      }
      borderCol += games.length;
    }
  });

  const colWidths = [
    { wch: 4 }, // 순위
    { wch: 10 }, // 등급
    { wch: 5.5 }, // 지구대
    { wch: 10 }, // 이름
    { wch: 6.5 }, // 에버
    { wch: 6 }, // 게임수
    { wch: 4.5 }, // 하이
  ];

  let totalGames = 0;
  sortedDates.forEach((date) => {
    const games = dateGameMap.get(date) || [];
    totalGames += games.length;
  });
  for (let i = 0; i < totalGames; i++) {
    colWidths.push({ wch: 4.5 }); // 세부 게임 점수
  }

  ws["!cols"] = colWidths;

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "에버표");

  const generationText = generationNumber ? `${generationNumber}기_` : "";
  const startDateText = startDate ? startDate.format("YYMMDD") : "";
  const endDateText = endDate ? endDate.format("YYMMDD") : "";
  const dateText = startDateText && endDateText ? `${startDateText}_${endDateText}` : "전체";
  const filename = `${generationText}에버표_${dateText}.xlsx`;

  XLSX.writeFile(wb, filename, { cellStyles: true });
}
