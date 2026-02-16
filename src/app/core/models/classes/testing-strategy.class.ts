import { TestCase } from "../interfaces/testing-strategy.interface";

class TestSuiteBuilder<T = void> {
    private readonly tests: TestCase<T>[] = [];

    public constructor(private readonly componentName: string) {}

    public register(test: TestCase<T>): this {
        this.tests.push(test);
        return this;
    }

    public run(): void {
        describe(this.componentName, () => {
            this.tests.forEach(({description, setup, execute, input, expect}) => {
                it(description, () => { 
                    setup?.();
                    execute(input);
                    expect();
                })
            })
        })
    }
}

export default TestSuiteBuilder; 