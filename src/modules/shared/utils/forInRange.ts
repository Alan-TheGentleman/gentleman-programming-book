type TupleFromLength<Length extends number> = number extends Length
	? number[]
	: {
			[Index in keyof any]: Index extends Length ? Index : never;
	  } extends { [Key in keyof any]: infer U }
	? U[]
	: never;

export function forInRange<T extends Readonly<number>>(length: T, start = 0) {
	return Array.from({ length }, (_, i) => i + start) as TupleFromLength<T>;
}
