import { AttributeHandlingMode } from "./attribute-handling-mode";

export class AttributeHandling {
    private mode: AttributeHandlingMode;

    constructor(mode: AttributeHandlingMode) {
        this.mode = mode;
    }

    getMode(): AttributeHandlingMode {
        return this.mode;
    }

    setMode(mode: AttributeHandlingMode): void {
        this.mode = mode;
    }
}
