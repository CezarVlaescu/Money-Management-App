import { Type, Component, Directive, Pipe, NgModule, ModuleWithProviders } from "@angular/core";

type Declarable = Type<Component> 
| Type<Directive> 
| Type<Pipe> 
| Type<NgModule>
| ModuleWithProviders<unknown>;

export type { Declarable }