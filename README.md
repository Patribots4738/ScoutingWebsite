## Setup

- - -
### Requirements
+  Code Editor (Github Codespaces are nice)
+  Npm (pre-installed on all Github Codespaces [free for students :) ])
- - -
### Google Sheets Setup
To begin setup, open Google Sheets and navigate to the Apps Script extension using the navigation bar. 
Once the extension is open, copy and paste the code below into the ```.gs``` file open, only changing __Sheet-Name__ on line 3 to your sheet name. 

```
// Thanks to @jamiewilson for the Google Apps Script: https://github.com/jamiewilson/form-to-google-sheets/blob/master/README.md

var sheetName = '[Sheet-Name]'
        var scriptProp = PropertiesService.getScriptProperties()

        function intialSetup () {
          var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
          scriptProp.setProperty('key', activeSpreadsheet.getId())
        }

        function doPost (e) {
          var lock = LockService.getScriptLock()
          lock.tryLock(10000)

          try {
            var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
            var sheet = doc.getSheetByName(sheetName)

            var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
            var nextRow = sheet.getLastRow() + 1

            var newRow = headers.map(function(header) {
              return header === 'timestamp' ? new Date() : e.parameter[header]
            })

            sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
              .setMimeType(ContentService.MimeType.JSON)
          }

          catch (e) {
            return ContentService
              .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
              .setMimeType(ContentService.MimeType.JSON)
          }

          finally {
            lock.releaseLock()
          }
        }
```
Now that you've copied the code into your file and changed the sheet name, click on __Deploy >> New deployment__ 

Now give your deployment a __New description__ and make sure that the deployment type is set to __Web App__ by clicking on the settings icon in the top left. 

Have __Execute as__ the owner of the document's email and make sure that __Who has access__ is set to __Anyone__.

Once you have made sure that the settings are correct, press __Deploy__.

We are going to also need to know the url of our app script, to do this click on __Deploy >> Manage deployments__ and copy the url of your Web app and save it somewhere for future reference. 

__IMPORTANT:__ Foe each peice of data that you want to record, name the Title of that data to row 1 of each column in the spreadsheet. 


### Local
Now you should have the code open in a editor and google sheets set up. 

Now open the ```Container.js``` file and replace the ```scriptUrl``` variable value with url of the app script we saved above.

NOTE: To run the website, run: 
```npm start```
in the terminal of your code editor. 

- - -
## Definitions and Explanations

```State``` - The container for all of the widgets/items in the page. Item lists can be written like so: 
``` 
state = {
    items: [
      {
        id: uuidv4(),
        title: "Name",
        type: "textbox",
        value: "",
        decorator: "name"
      },
	  . . .
	]
}
```
The state contains the item list, which contains every item in the page, separated by curly brackets. 

```Widget``` - Each individual item that is being added to the page. In order to select the widget that you want to use, define the type, and the keys associated with that type.

```checkbox``` - The widget that creates a checkbox with a title.
  + id
  + title
  + value
  + classNameDecorator

```counter``` - The widget creates a title, a counter and two buttons that increment and decrement the counter. 
  + id
  + title
  + value
  + classNameDecorator

```dropdown``` - The widget that a dropdown and a title for that dropdown (given the list of items, their ids and their titles)
  + id
  + title
  + value
  + items
  + classNameDecorator

```submit``` - The widget that __must__ be on every website page, creating a button for the user to submit the data.
  + id
  + title
  + data
  + classNameDecorator

```textbox``` - The widget that creates a non-adjustable text box and a title.
  + id 
  + title
  + classNameDecorator

```textbox-long``` - The widget that creates adjustable text box and title.
  + id 
  + title
  + classNameDecorator

NOTE: The id of each widget should always be the code segment
```uuidv4()``` 
to randomly generate a unique id every single time, as to not break any of the widgets. 

- - -
## Layout Overview

* State
  + Widget
    + checkbox
	  + id
	  + title
	  + value 
	  + classNameDecorator
    + counter 
      + id
	  + title
	  + value
	  + classNameDecorator
    + dropdown
      + id
	  + title
	  + value
	  + items
	  + handleDropdownChange
	  + classNameDecorator
    + submit 
      + title
	  + id
	  + data
	  + classNameDecorator
    + textbox 
	  + title
	  + id
	  + classNameDecorator
    + textbox-long 
	  + title
	  + id
	  + classNameDecorator