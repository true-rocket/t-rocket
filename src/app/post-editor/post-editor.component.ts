import { Component, OnInit } from '@angular/core';
import { PostStructure, PostChunk, SelectionData } from './post';

@Component({
    selector: 'app-post-editor',
    templateUrl: './post-editor.component.html',
    styleUrls: ['./post-editor.component.scss']
})

export class PostEditorComponent implements OnInit {
    debugData: Object = new Object
    debugInfo() { }

    currentDecorations: string[] = []

    text = new PostStructure

    newChunk = false
    decorationApplied = false
    init = false;

    public focusBack() { // returns bursor back to position after blur
        let el = document.getElementById("edit-area");
        let startNode, endNode;
        let start, end;

        startNode = this.text.selection.startNode;
        endNode = this.text.selection.endNode;
        end = this.text.selection.end;
        start = this.text.selection.start;

        if (startNode == this.text.data.length) {
            startNode--;
            endNode = startNode;
            console.log("!!last node!!", this.text.data.length);
            end = start = this.text.data[startNode].text.length;
        }

        this.text.selection.selectionObj.setBaseAndExtent(el.childNodes.item(startNode + 1).childNodes[0],
            start,
            el.childNodes.item(endNode + 1).childNodes[0],
            end);

        el.focus();
    }

    public handleSelection(event: KeyboardEvent) {
        // if (event)
        // if (event.key == "Enter") { // separate line-break handling
        // console.log("Enter");
        // document.getElementById("edit-area").removeChild(document.getElementById("edit-area").lastChild);
        // return;
        // }
        this.text.selection.handleSelection();
        if (event.key) {
            if (this.newChunk) {
                if (event.key.length == 1) {
                    // this
                    // this.text.data[this.text.selection.endNode].text
                    let old = this.text.data[this.text.selection.startNode].text;
                    old = old.substring(0, old.length - 1);
                    console.log(document.activeElement.nodeName);
                    this.text.selection.startNode++;
                    this.text.selection.endNode++;
                    this.text.selection.start = this.text.selection.end = 1;
                    this.text.data[this.text.selection.startNode].text = event.key;

                } else {
                    // this.text.data[this.text.selection.startNode].text = "";
                    // this.text.selection.startNode++;
                    // this.text.selection.endNode++;
                    // this.text.selection.start = this.text.selection.end = 0;
                }
            } else {
                this.text.syncWithHTML();
                this.text.checkConsistance();
            }
        }
        this.newChunk = false;
    }

    public toggleBold() {
        if (this.text.selection.selection == "") { // start typing in new chunk
            this.newChunk = true;
        }
        this.text.toggleBold();
    }

    public toggleItalic() {
        if (this.text.selection.selection == "") { // start typing in new chunk
            this.newChunk = true;
        } else
            this.text.toggleItalic();
    }

    public toggleUnderlined() {
        if (this.text.selection.selection == "") { // start typing in new chunk
            this.newChunk = true;
        } else
            this.text.toggleUnderlined();
    }

    public toggleCrossed() {
        if (this.text.selection.selection == "") { // start typing in new chunk
            this.newChunk = true;
        } else
            this.text.toggleCrossed();
    }

    public savePost() {
        console.log("savePost");
        console.log("mockFutction");
    }

    constructor() {
        // mock constructor
        this.text.data[0] = new PostChunk("plain text lorem ipsum dolar sit amet ");
        this.text.data[1] = new PostChunk("bold text ", ["bold"]);
        this.text.data[2] = new PostChunk("bold text ", ["bold"]);
        this.text.data[3] = new PostChunk("bold and underlined", ["bold", "underlined"]);
        this.text.data[4] = new PostChunk("plain text");
        this.text.checkConsistance()
        this.runTest()

    }

    // public setFocus(chunk: number = -1) {
    //     if (chunk == -1) chunk = this.text.data.length - 1;
    //     // let el = <HTMLElement>(document.getElementById("edit-area").children[chunk]);
    //     // el.focus();
    //     document.getElementById("edit-area").focus();
    //     // let el = document.getElementById("edit-area");
    //     // setTimeout(function() {
    //     //     el.focus();
    //     // }, 0);
    // }


    runTest() {
    }

    ngOnInit() {
    }

    ngDoCheck() {
        // if (!this.newChunk)
        // this.text.checkConsistance();
        // console.log("consistance checked");
        this.currentDecorations = this.text.getCommonDecorations();

    }

    ngAfterContentChecked() {
    }

    ngAfterViewChecked() {
        // this.currentDecorations = this.text.getCommonDecorations();
        console.log("focused back");
        this.focusBack();
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        // this.decorationApplied = false;
    }

    ngOnChanges() {
        // console.log(document.getSelection().focusNode.textContent);
        this.text.syncWithHTML();
        this.text.selection.handleSelection();
    }
};

