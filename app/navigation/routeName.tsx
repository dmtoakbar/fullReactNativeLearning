import { Component } from "react";
import Temp from "../screen";
import AnimatedApi from "../screen/animation/animationThroughNativeApi/nativeApiAnimation";
import TodoListScreenZustand from "../screen/zustand";

export const routeNames = [
  { name: 'temp', component: Temp },
  { name: 'animatedApi', component: AnimatedApi },
  {name: 'todo-list-zustand', component: TodoListScreenZustand}
];
