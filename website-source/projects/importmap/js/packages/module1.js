
import { getModule2Text } from "module2"

export function getModule1Text() {
    return "✅ module 1 imported" + getModule2Text();
}

export function getModule1TextOnly() {
    return "✅ module 1 imported";
}