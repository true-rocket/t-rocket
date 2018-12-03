// import { DebugContext } from "@angular/core";

// sory for spoiler
// this code is a puddle of shit

// allowed text decorators
// italic
// bold
// underlined
// crossed

// checks if two arrays consist same
// elements regardles their order

/*
 
  angular component lifecycle
  
  OnChanges
  OnInit
  Docheck
  AfterContentInit
  AfterContentChecked
  AfterViewInit
  AfterViewChecked
      |
      +<----------------+
      |                 |
  DoCheck               |
  AfterContentChecked   |
  AfterViewChecked  ----+
      |
  onDestroy
  
  post process lifecycle
  - handle selection
  
*/


function areEqual<T>(one: T[], two: T[]): boolean {
    if (one.length != two.length) return false;

    for (let val of one) {
        if (!two.includes(val)) return false;
    }

    for (let val of two) {
        if (!one.includes(val)) return false;
    }

    return true;
}

function removeValue<T>(arr: T[], val: T) {
    arr.forEach((item, index) => {
        if (item == val) arr.splice(index, 1);
    })
}

function toggleValue<T>(arr: T[], val: T) {
    if (arr.includes(val)) {
        removeValue(arr, val);
    } else {
        arr.push(val);
    }
}

// structure of the chunks the post
// consists of
export class PostChunk {
    text: string = "";
    decoration: string[] = [];
    getCSS() {
        if (this.decoration)
            return this.decoration.reduce((acc, val) => acc + val + " ", "");
        else
            return ""
    }
    constructor(txt: string = "", dec: string[] = []) {
        this.text = txt;
        this.decoration = dec;
    }
};


export class SelectionData {
    selectionObj: Selection = window.getSelection()
    selection: string = ""	// the selected string itself
    start: number = 0	// starting position of the celected text
    end: number = 0	// ending position of the celected text
    startNode: number = 0	// index of starting node 
    endNode: number = 0	// index of ending node
    // absoluteOffset: [number, number]

    handleSelection() {
        console.log("handleSelecion");
        this.selectionObj = document.getSelection()
        this.selection = document.getSelection().toString();
        this.start = document.getSelection().anchorOffset;
        this.end = document.getSelection().focusOffset;
        // hardest part
        // computing selection starting and ending points

        let nodes = document.activeElement.childNodes;

        console.log("activeElement", document.activeElement.id);
        console.log("last child", document.activeElement.lastChild.nodeName);

        // enter was pressed
        // need to add the linebreak
        if (document.activeElement.lastChild.nodeName == "DIV") {
            console.log("DIV ~~~~");

            // document.activeElement.removeChild(document.activeElement.lastChild);
            let doc = document.getElementById("edit-area");
            let el = document.getElementById("edit-area").lastChild;
            for (let node of el.childNodes) {
                console.log(node.childNodes[0].textContent);
                let newNode: Node;
                newNode = node.cloneNode();
                newNode.textContent = node.childNodes[0].textContent;
                // newNode.textContent = node;
                doc.insertBefore(newNode, el);
            }
            console.log("DIV ~~~~");
            doc.removeChild(el);
            // return;
        }

        this.startNode = -1;
        this.endNode = -1;

        let cnt;

        for (cnt = 0; cnt < nodes.length; cnt++) {
            if (document.getSelection().containsNode(nodes.item(cnt), true)) {
                if (this.startNode == -1) {
                    this.startNode = cnt - 1;
                }
                this.endNode = cnt - 1;
            }
        }

        if (this.selectionObj.anchorNode.compareDocumentPosition(this.selectionObj.focusNode) == 2) {
            [this.endNode, this.startNode] = [this.startNode, this.endNode];
        }

        if (this.startNode == this.endNode) {
            if (this.start > this.end) {
                [this.start, this.end] = [this.end, this.start];
            }
        }
        // if (this.selectionObj.focusNode.isEqualNode(nodes[this.startNode + 1]) alert("rev");

        console.log("nodes", nodes.length);
        console.log("startNode", this.startNode);
        console.log("endNode", this.endNode);
        console.log("start", this.start);
        console.log("end", this.end);
        if (this.startNode == -1) this.startNode = 0;
        if (this.endNode == -1) this.endNode = 0;
        if (this.startNode == nodes.length - 1) {
            alert("bug");
        }
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        // this.absoluteOffset[0] = 0;
        // this.absoluteOffset[1] = 0;
    }

    debugInfo() {
    }

    constructor() { }

    runTest() { }

}

export class PostStructure {
    data: PostChunk[] = []
    selection: SelectionData = new SelectionData

    // merges neighbour elements with same decorators
    public checkConsistance() {
        console.log("checkConsistance")
        let data = this.data
        let absolutePos = 0;
        let offset = 0;

        let startNode = 0,
            endNode = 0,
            start = 0,
            end = 0;

        console.log("data length", data.length);

        if (this.selection.startNode > this.selection.endNode) {
            startNode = this.selection.endNode;
            endNode = this.selection.startNode;
            start = this.selection.end;
            end = this.selection.start;
        } else {
            startNode = this.selection.startNode;
            endNode = this.selection.endNode;
            start = this.selection.start;
            end = this.selection.end;
        }

        for (let cnt = 0; cnt < startNode; cnt++) {
            absolutePos += this.data[cnt].text.length;
        }
        absolutePos += start;

        offset = this.selection.selectionObj.toString().length;

        console.log("Absolute pos", absolutePos);
        console.log("Offset", offset);


        for (let cnt = 0; cnt < data.length - 1; cnt++) {
            console.log("data text", data[cnt].text);

            if (data[cnt].text == "") {
                data.splice(cnt, 1);
            }

            if (areEqual(data[cnt].decoration, data[cnt + 1].decoration)) {
                data[cnt].text += data[cnt + 1].text;
                data.splice(cnt + 1, 1);
                cnt--;
            }
        }

        this.selection.start = 0;
        this.selection.end = 0;
        this.selection.startNode = 0;
        this.selection.endNode = 0;


        for (let chunk of this.data) {
            if (chunk.text.length < absolutePos) {
                this.selection.startNode++;
                absolutePos -= chunk.text.length;
            } else {
                this.selection.start = absolutePos;
                offset += absolutePos;
                this.selection.endNode = this.selection.startNode;
                break;
            }
        }

        for (let cnt = this.selection.startNode; cnt < this.data.length; cnt++) {
            let chunk = this.data[cnt].text.length
            if (chunk < offset) {
                this.selection.endNode++;
                offset -= chunk;
            } else {
                this.selection.end = offset;
                break;
            }
        }

        console.log("StartNode", this.selection.startNode);
        console.log("EndNode", this.selection.endNode);
        console.log("Start", this.selection.start);
        console.log("End", this.selection.end);

        // if (this.selection.startNode == this.data.length) {
        //     this.selection.startNode--;
        //     this.selection.endNode = this.selection.startNode;
        //     this.selection.end = this.data[this.selection.startNode].text.length - 1;
        // }

        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

    // get common decorations of selected chunks
    public getCommonDecorations() {
        let decoration = []

        let rev = false;

        if (this.selection.startNode == this.selection.endNode)
            return this.data[this.selection.startNode].decoration

        if (this.selection.startNode > this.selection.endNode) {
            rev = true;
            [this.selection.endNode, this.selection.startNode] = [this.selection.startNode, this.selection.endNode];
        }

        for (let dec of this.data[this.selection.startNode].decoration) {
            let common = true
            for (let cnt = this.selection.startNode + 1; cnt <= this.selection.endNode; cnt++) {
                if (!this.data[cnt].decoration.includes(dec)) {
                    common = false
                    break
                }
            }
            if (common)
                decoration.push(dec)
        }

        if (rev) {
            [this.selection.endNode, this.selection.startNode] = [this.selection.startNode, this.selection.endNode];
        }


        return decoration

    }

    // inserts currently selected chunk
    // on current position with given decorations
    insertChunk(decorations: string[]) {
        let chunk = new PostChunk
        chunk.decoration = decorations
        chunk.text = this.selection.selection
        // check if selected text
        // contained by single node
        // if text was selected in reverse direction
        if (this.selection.endNode == this.selection.startNode) {
            let rev = false;
            if (this.selection.end < this.selection.start) {
                [this.selection.end, this.selection.start] = [this.selection.start, this.selection.end];
                rev = true;
            }

            let oldLeft, oldRight, oldDec;

            // extracting old parts of current chunk and saving their decorations
            oldLeft = this.data[this.selection.endNode].text.substring(0, this.selection.start);
            oldRight = this.data[this.selection.endNode].text.substring(this.selection.end);
            oldDec = this.data[this.selection.endNode].decoration

            if (oldLeft != "") {
                this.data.splice(this.selection.startNode, 0, new PostChunk(oldLeft, oldDec));
                this.selection.start = 0;
                this.selection.startNode++;
                this.selection.endNode++;
            }

            if (oldRight != "") {
                this.data.splice(this.selection.startNode + 1, 0, new PostChunk(oldRight, oldDec));
                this.selection.end = chunk.text.length;
            }

            this.data.splice(this.selection.startNode, 1, chunk)
            if (rev) {
                [this.selection.end, this.selection.start] = [this.selection.start, this.selection.end];
            }

        }
        else {
            if (this.selection.startNode > this.selection.endNode) {
                [this.selection.startNode, this.selection.endNode] = [this.selection.endNode, this.selection.startNode]
                [this.selection.start, this.selection.end] = [this.selection.end, this.selection.start]
            }
            let oldLeft, oldRight, oldDecLeft, oldDecRight;
            oldLeft = this.data[this.selection.startNode].text.substring(0, this.selection.start);
            oldRight = this.data[this.selection.endNode].text.substring(this.selection.end);
            oldDecLeft = this.data[this.selection.startNode].decoration;
            oldDecRight = this.data[this.selection.endNode].decoration;

            if (oldLeft != "") {
                this.data.splice(this.selection.startNode, 1, new PostChunk(oldLeft, oldDecLeft));
                this.selection.startNode++;
                this.selection.start = 0;
            }

            if (oldRight != "") {
                this.data.splice(this.selection.endNode, 1, new PostChunk(oldRight, oldDecRight));
                this.selection.endNode--;
                this.selection.end = 0;
            }

            this.data.splice(this.selection.startNode, this.selection.endNode - this.selection.startNode + 1, chunk);
        }
    }

    public toggleBold() {
        let dec = this.getCommonDecorations().slice()
        toggleValue(dec, "bold");
        this.insertChunk(dec);
        // this.checkConsistance();
    }

    public toggleItalic() {
        let dec = this.getCommonDecorations().slice()
        toggleValue(dec, "italic")
        // html doesn't allow italic and underlined at the same time
        removeValue(dec, "underlined");
        this.insertChunk(dec);
    }

    public toggleUnderlined() {
        let dec = this.getCommonDecorations().slice()
        toggleValue(dec, "underlined");
        removeValue(dec, "italic");
        this.insertChunk(dec);
    }

    public toggleCrossed() {
        let dec = this.getCommonDecorations().slice();
        toggleValue(dec, "crossed")
        this.insertChunk(dec);
    }

    public syncWithHTML() {
        // this needed since ngModel doesn't work with contenteditable div
        console.log("SyncWithHtml");
        console.log("before", this.data[this.selection.endNode].text);
        this.data[this.selection.endNode].text = document.getSelection().focusNode.textContent;
        console.log("after", this.data[this.selection.endNode].text);
        console.log("textContent", document.getSelection().focusNode.textContent);
        console.log("activeElement", document.activeElement.id);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }

    debugInfo() {
        let text = []
        let keys = Object.keys(this.selection)

        for (let prop in this.selection) {
            if (typeof (this.selection[prop]) != "function")
                text.push([prop, this.selection[prop]])
        }

        return text;

    }

    constructor() {
        this.runTest();
    }

    runTest() {
        console.log("Module Post");
        console.log("areEqual");
        console.log("4, 5, 6 : 4, 5, 6", areEqual([4, 5, 6], [4, 5, 6]));
        console.log("1, 3, 2 : 2, 1, 3", areEqual([1, 3, 2], [2, 1, 3]));
        console.log("1, 2, 3, 4 : 1, 2, 3", areEqual([1, 2, 3, 4], [1, 2, 3]));
        console.log("Check consistence");
        console.log(this.data.length)
        this.checkConsistance();
        console.log(this.data.length);
        console.log("Remove value");
        let arr = [1, 2, 5, 0];
        console.log(arr);
        removeValue(arr, 5);
        console.log(arr);
        toggleValue(arr, 5);
        console.log(arr);
        arr = [];
        console.log(arr);
        removeValue(arr, 5);
        console.log(arr);
        toggleValue(arr, 5);
        console.log(arr);
        let a, b;
        a = 1;
        b = 2;
        console.log("Swap", a, b);
        [a, b] = [b, a];
        console.log(a, b);
    };


};
