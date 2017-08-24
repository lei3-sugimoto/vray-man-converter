/**
 *
 * data
 *
 * usage: for image examples (using table)
 *
 * desc
 * - description line(s) under the title
 * - repeat includs multiple html lines
 * - only one repeat in a template
 *
 * row
 * - rows of the image table (could be 1)
 * - repeat includs multiple html lines
 * - only one repeat in a template
 *
 * column
 * - columns of the image table (generally more than 1)
 * - repeat includs only single line
 * - multiple repeats can be happen if the number of row is more than one
 *
 */

const DescCount   = 2
const RowCount    = 2
const ColumnCount = 2



var titleText = "@@titleText"
var descText = "@@descText"
var cellText = "@@cellText"

const template = {
	"html": [
		{
			"no": 1,
			"code": "table(class=`${classStdTable}`)",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 2,
			"code": "	caption",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 3,
			"code": `		${titleText}`,
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": "title",
			"skipIfSingleRow": false
		},
		{
			"no": 4,
			"code": "		br",
			"desc": {"start": true,  "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 5,
			"code": `		span.note ${descText}`,
			"desc": {"start": false, "mid": false, "end": true},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": "desc",
			"skipIfSingleRow": false
		},
		{
			"no": 6,
			"code": "	thead",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 7,
			"code": "		tr",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 8,
			"code": "			th(rowspan='2')",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": true
		},
		{
			"no": 9,
			"code": `			th(colspan='${ColumnCount}')`,
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 10,
			"code": "		tr",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 11,
			"code": `			th ${cellText}`,
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": true,
			"text": "cell",
			"skipIfSingleRow": false
		},
		{
			"no": 12,
			"code": "	tbody",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 13,
			"code": "		tr",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": true,  "mid": false, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": false
		},
		{
			"no": 14,
			"code": "			th",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": true, "end": false},
			"column": false,
			"text": false,
			"skipIfSingleRow": true
		},
		{
			"no": 15,
			"code": "			td: +thumbnail(`${img5}`)",
			"desc": {"start": false, "mid": false, "end": false},
			"row":  {"start": false, "mid": false, "end": true},
			"column": true,
			"text": false,
			"skipIfSingleRow": false
		}
	]
}

const contents = {
	"text": [
{"type":"title","line":1,"org":"Example: Zoom Factor","ja":"あいう"},
{"type":"desc","line":1,"org":"This parameter determines the zooming (In and Out) of the final image. It doesn't move the camera forward nor backwards.","ja":"えおか"},
{"type":"desc","line":2,"org":"Exposure is on, f-number is 8.0, shutter speed is 60.0, film speed (ISO) is 200.0, vignetting is on, white balance is white.","ja":"あいう"},
{"type":"cell","line":1,"org":"zoom factor = 1.0","ja":"えおか"},
{"type":"cell","line":2,"org":"zoom factor = 2.0","ja":"あいう"},
{"type":"cell","line":3,"org":"zoom factor = 0.5","ja":"えおか"}
{"type":"cell","line":4,"org":"zoom factor = 2.0","ja":"あいう"}
],
	"meta": {
		"DescCount": 2,
		"RowCount": 2,
		"ColumnCount": 2
	}
}

/**
 *
 * state
 *
 */

var processingDesc   = false
var processingRow    = false
var processingColumn = false

// can process?
var canProcessDesc   = ()=>{return !processingRow  && !processingColumn}
var canProcessRow    = ()=>{return !processingDesc && !processingColumn}
var canProcessColumn = ()=>{return !processingDesc && !processingRow}

// start
var startProcessingDesc = ()=>{
	if(processingDesc) throw new UserExeption("desc is already processing")
	processingDesc = true
}
var startProcessingRow = ()=>{
	if(processingRow)  throw new UserExeption("row is already processing")
	processingRow = true
}
var startprocessingColumn = ()=>{
	if(processingColumn) throw new UserExeption("column is already processing")
	processingColumn = true
}

// finish
var finishProcessingDesc = ()=>{
	if(!processingDesc) throw new UserExeption("desc is not processing")
	processingDesc = false
}
var finishProcessingRow = ()=>{
	if(!processingRow)  throw new UserExeption("row is not processing")
	processingRow = false
}
var finishprocessingColumn = ()=>{
	if(!processingColumn) throw new UserExeption("column is not processing")
	processingColumn = false
}

/**
 *
 * utility
 *
 */

// exception
function UserExeption(message){
	this.message = message
	this.name = "UserExeption"
}

// sort
var sortAscending = (array)=>{
	return array.sort((a, b)=>{
	    if(a.no < b.no) return -1
	    if(a.no > b.no) return 1
	    return 0	
	})
}

/**
 *
 * output code
 *
 */

var finalCodes = []

var pushCode = (code)=>{
	finalCodes.push(code)
}

/**
 *
 * desc
 *
 */

var descItems = []

var hasDescStart = (item)=>{return item.desc.start}
var hasDescMid   = (item)=>{return item.desc.mid}
var hasDescEnd   = (item)=>{return item.desc.end}
var hasDesc      = (item)=>{return hasDescStart(item) | hasDescMid(item) | hasDescEnd(item)}

var poolDescItem = (item)=>{
	descItems.push(item)
}

var replicateAndPushDescCodes = ()=>{
	if(DescCount >= 1){
		for(i = 0; i < DescCount - 1; i++){
			descItems = descItems.concat(descItems)
		}
	}
	descItems.forEach((item)=>{
		pushCode(item.code)
	})
}

/**
 *
 * row
 *
 */

var rowItems = []

var hasRowStart  = (item)=>{return item.row.start}
var hasRowMid    = (item)=>{return item.row.mid}
var hasRowEnd    = (item)=>{return item.row.end}
var hasRow       = (item)=>{return hasRowStart(item) | hasRowMid(item) | hasRowEnd(item)}

var poolRowItem = (item)=>{
	rowItems.push(item)
}

var replicateAndPushRowCodes = ()=>{
	if(RowCount >= 1){
		for(i = 0; i < RowCount - 1; i++){
			rowItems = rowItems.concat(rowItems)
		}
	}
	rowItems.forEach((item)=>{
		if(hasColumn(item)){
			poolColumnItem(item)
			// returnを入れないと、colunmデータとしてだけでなく、後続でrowデータとしても重複してpushされてしまう
			return replicateAndPushColumnCode()
		}
		pushCode(item.code)
	})
}

/**
 *
 * column
 *
 */

var columnItems = []

var hasColumn = (item)=>{return item.column}

var poolColumnItem = (item)=>{
	resetColumnItems()
	columnItems.push(item)
}

var resetColumnItems = ()=>{
	columnItems = []
}

var replicateAndPushColumnCode = ()=>{
	if(ColumnCount >= 1){
		for(i = 0; i < ColumnCount - 1; i++){
			columnItems = columnItems.concat(columnItems)
		}
	}
	columnItems.forEach((item)=>{
		pushCode(item.code)
	})
}

/**
 *
 * others
 *
 */

var pushOtherCode = (item)=>{
	pushCode(item.code)
}

var isSkip = (item)=>{
	return item.skipIfSingleRow && RowCount == 1
}

var applyTitleText = (item)=>{
	if(item.text == "title") item.code
}

var searchText = (type, count)=>{

}

/**
 *
 * main
 *
 */

sortAscending(template.html).forEach((item)=>{
	// console.log("item.no: ", item.no)

	// desc
	if(hasDesc(item) && canProcessDesc()){

		if(hasDescStart(item)) startProcessingDesc()
		// if(hasDescMid(item))
		if(hasDescEnd(item))   finishProcessingDesc()

		poolDescItem(item)
		return hasDescEnd(item)? replicateAndPushDescCodes() : true
	}

	// row (+ column)
	if(hasRow(item) && canProcessRow()){

		if(hasRowStart(item)) startProcessingRow()
		// if(hasRowMid(item))
		if(hasRowEnd(item))   finishProcessingRow()

		poolRowItem(item) 
		return hasRowEnd(item)? replicateAndPushRowCodes() : true
	}

	// column
	if(hasColumn(item) && canProcessColumn()){
		poolColumnItem(item)
		return replicateAndPushColumnCode()
	}

	// others
	if(!isSkip(item)) pushOtherCode(item)
})

console.log(finalCodes)
