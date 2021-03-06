(function getImageLinks() {
	var srcArray = [];

	/* grab all the parent containers that identify posted images*/
	var parents = document.getElementsByClassName("_jjzlb");

	/*push the img srcs to an array*/
	for (i=0; i < parents.length; i++) {
		srcArray.push(parents[i].firstChild.src);
	}

	/* grab the body to append to*/
	var docBody = document.getElementsByTagName("body")[0];
	var outputExists = document.getElementById("sos-output");

	/*check to see if output has already been appended*/
	if (!outputExists) {
		/* does not exist 
		make an output div for the links*/
		var outputDiv = document.createElement("div");

		/* output div attributes*/
		outputDiv.setAttribute("id", "sos-output");
		outputDiv.setAttribute("style", "position:fixed; top: 0; left:0; padding: 15px; background-color: #fff; box-shadow: 2px 4px 12px #000; text-align: center; height: 300px; width: 400px; overflow-y:scroll; z-index: 9999;");
		/* append output div to body*/
		docBody.appendChild(outputDiv);
		/* header creation, setting and appending */
		var outputHeader = document.createElement("div");

		outputHeader.setAttribute("id", "sos-output-header");
		outputHeader.setAttribute("style", "position: relative;");
		outputDiv.appendChild(outputHeader);
		/* brandname creation, setting and appending */
		var appName = insertText("h2", "Save Our Selfies");

		appName.setAttribute("style", "margin-bottom: 15px; font-weight: bold; font-family: 'Helvetica', 'Helvetica-Nueue', sans-serif; font-size: 24px;");
		outputHeader.appendChild(appName);
		/* close widget, setting and appending */
		var closeButton = insertText("span", "\u00D7");

		closeButton.setAttribute("style", "position: absolute; top: 0; right: 0; cursor: pointer; font-size: 48px; line-height: 0.5; color: #f00;");
		closeButton.addEventListener("click", function() {
			closeWidget();
		});
		outputHeader.appendChild(closeButton);

		
		/* instructions creation, setting and appending */
		var outputInstruct = insertText("p", "Click on a link to open image in new tab. Then right click on the image and 'Save image as'. Click 'Refresh' to get links for any updated on-screen images.");

		outputInstruct.setAttribute("style", "font-size: 12px; line-height: 1; margin-bottom: 15px;");
		outputHeader.appendChild(outputInstruct);

		/*refresh button and setting*/
		var outputRefresh = insertText("a", "Refresh", "sos-output-refresh");

		outputRefresh.setAttribute("style", "background-color: #29d; color: #fff; padding: 5px 4px; margin-bottom: 10px; cursor: pointer; display: block;");
		outputRefresh.addEventListener("click", function() {
		/* assign event listener to call script again */
			getImageLinks();
		});
		outputHeader.appendChild(outputRefresh);
		createHeader();	

		/*create the link list area*/
		var outputList = document.createElement("ul");
		outputList.setAttribute("style", "margin: 0; padding: 0;");
		outputList.setAttribute("id", "sos-output-list");
		outputDiv.appendChild(outputList);


	} else {
		/*does exist so clear the list upon refresh*/
		var headerElement = document.getElementById("sos-title");
		var outputList = document.getElementById("sos-output-list");

		headerElement.parentNode.removeChild(headerElement);
		createHeader();
		while (outputList.lastChild) {
		  outputList.removeChild(outputList.lastChild);
		}
	}


	for(i=0; i<srcArray.length; i++) {
		var listItem = document.createElement("li");
		var imgLink = insertText("a", "image link " + (i + 1));

		/* create, set attributes and append the links to the output div*/
		listItem.setAttribute("style", "display: inline-block; width: 50%;");

		imgLink.setAttribute("href", srcArray[i]);
		imgLink.setAttribute("target", "_blank");
		imgLink.setAttribute("style", "color: #29d; margin-bottom: 10px; display: block;");
		listItem.appendChild(imgLink);
		document.getElementById("sos-output-list").appendChild(listItem);
	}

	function closeWidget() {
		var widget = document.getElementById("sos-output"); 
		widget.parentNode.removeChild(widget);
	}

	/* create an element, insert text to it and optional id */
	function insertText (element, text, id) {
		var elem = document.createElement(element);
		var txt = document.createTextNode(text);
		id = id || '';

		if (id !== '') {
			elem.setAttribute("id", id);
		}
		elem.appendChild(txt);

		return elem;
	}

	/* create the content for the output div*/
	function createHeader () {
		var outputElement = document.getElementById("sos-output-header");
		var headerTitle = insertText("h3","Image Links (" + parents.length + ")", "sos-title");
		/* style the header*/
		headerTitle.setAttribute("style", "font-weight: bold; text-transform: uppercase; margin-bottom: 15px;");
		outputElement.appendChild(headerTitle);

	}
	
})();
