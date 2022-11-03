// AllColors Object
function AllColors(colorArray){

    if(colorArray != null){
        this.colors = colorArray;
    } else{
        // Here are differnet ways to write colors
        this.colors = ["slateBlue", "pink", "crimson", "darkOrange", "gold", "lightGreen", "powderblue",  "dodgerBlue"]
    }

    this.GrabRandomColor = () => {
        return this.colors[Math.floor(Math.random() * this.colors.length)]
    }

    this.AddRandomColor = () => {
      let red = Math.floor(Math.random() * 255)
      let green = Math.floor(Math.random() * 255)
      let blue = Math.floor(Math.random() * 255)

      let colorString = "rgb(" + red + "," + green + "," + blue + ")"
      this.colors.push(colorString)
    }
}

  // Table is our HTML Table Object, we can fill it, clear it, resize it and display it
  function Table(inputX, inputY){
    this.x = inputX
    this.y = inputY
    this.tableArray = []
    this.table
    
    // FillTableInOrder method takes an AllColors object and 
    // fills each of the tables cells with colours in order 
    // they appear in the AllColors.colors array, then repeats
    this.FillTableInOrder = function(allColor){
      let count = 0
      for(let i = 0; i < this.y; i++){
        this.tableArray.push([])
        for(let j = 0; j < this.x; j++){
          count++
          count = count % allColor.colors.length // % give us a remainder
          this.tableArray[i].push(allColor.colors[count])
        }
      }
    }
  
    // DisplayTable method interfaces with the HTML of the site and displays the table
    // Don't worry about its workings
    this.DisplayTable = function() {
      this.table = document.createElement("table", "border = 1")
      this.table.style.border = "1px solid #000"
      var tableBody = document.createElement('tbody')
      var context = this   // Jamie's fix
      this.tableArray.forEach(function(rowData) {
        var row = document.createElement('tr')
  
        rowData.forEach(function(cellData) {
          var cell = document.createElement('td')
          cell.style.background = cellData
          cell.width = window.innerWidth / context.x
          cell.height = window.innerHeight / context.y
          row.appendChild(cell)
                
          })
        tableBody.appendChild(row)
      })
  
      this.table.appendChild(tableBody)
      document.body.appendChild(this.table)
    }
  
    // RefreshTable removes the table from the HTML
    this.RefreshTable = function(){
      this.table.remove()
      this.DisplayTable()
    }

    this.FillCell = function(row, column, color){
      this.tableArray[column][row] = color
    }
  }
  
  // Declare our objects
  let myColors = new AllColors(["dodgerBlue", "powderblue", "lightGreen", "gold", "darkOrange", "crimson", "pink", "slateBlue"])
  let myTable = new Table(50,50)
  myTable.FillTableInOrder(myColors)
  // myTable.FillCell(2,2,"black")
  myTable.DisplayTable()


  function RandomiseTableAndDisplay(){
    myTable.FillCell(Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), myColors.GrabRandomColor(), myColors.AddRandomColor())
    myTable.RefreshTable()
  }



  
  setInterval("RandomiseTableAndDisplay()", 0)


  