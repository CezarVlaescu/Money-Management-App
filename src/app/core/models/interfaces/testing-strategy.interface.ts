import { Type, Component, Provider, SchemaMetadata } from "@angular/core";
import { Declarable } from "../types/testing-strategy.types";

interface TestCase<T> {
    description: string;
    setup?: () => void;
    input?: T;
    execute: (input?: T) => void;
    expect: () => void;
}

interface CreateTestModuleConfig<T> {
    component: Type<T>;
    declarations?: readonly Type<Component>[];
    providers?: readonly Provider[];
    imports?: readonly Declarable[];
    schemas?: readonly SchemaMetadata[];
}

export type { TestCase, CreateTestModuleConfig }