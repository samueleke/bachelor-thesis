import { ResultState } from '../redux/result/result_reducer';

export function attemptsNumber(result: ResultState[]): number {
    return result.filter((r) => r !== undefined).length;
}

export function earnedPoints(
    result: any[],
    answers: { [x: string]: any },
    point: number,
) {
    return result
        .map((element, i) => answers[i] === element)
        .filter((i) => i)
        .map((i) => point)
        .reduce((prev, current) => prev + current, 0);
}

export function flagResult(totalPoints: number, earnPoints: number) {
    return (totalPoints * 50) / 100 < earnPoints;
}
