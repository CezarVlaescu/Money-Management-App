import { Provider, NO_ERRORS_SCHEMA } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { CreateTestModuleConfig } from "../models/interfaces/testing-strategy.interface";

const safeArray = <T>(value?: readonly T[]) => value ?? [];

const autoProvideMocks = <T, U> (tokens: T[], mocks: Record<string, U>): Provider[] => {
    return tokens.map((token: T) => {
        const tokenName = token as string;
        const mockKey = `${tokenName.charAt(0).toLowerCase()}${tokenName.slice(1)}Mock` as string;

        return {
            provide: token,
            useValue: mocks[mockKey]
        } as Provider
    })
}

const createTestModule = <T> (config: CreateTestModuleConfig<T>): Promise<void> => {
    return TestBed.configureTestingModule({
        declarations: [config.component, ...safeArray(config.declarations)],
        providers: [safeArray(config.providers)],
        imports: [safeArray(config.imports)],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
}

export default { autoProvideMocks, createTestModule };