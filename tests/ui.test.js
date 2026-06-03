// @vitest-environment jsdom 

// Added jsdom environment for testing DOM manipulation in UI class

import { describe, it, expect, beforeEach } from 'vitest';
import { UI } from "../js_files/ui.js";

describe("showWinMessage", () => {
    let ui;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="win" style="display:none"></div>
        `;

        ui = new UI();
    });

    it("should display the win message", () => {
        ui.showWinMessage();

        expect(
            document.getElementById("win").style.display
        ).toBe("block");
    });
});