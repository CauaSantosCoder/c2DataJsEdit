//@CauaSantos - Skull
//Created on: 01/11/2023
//jQuery 1.11.1

$(document).on('pageinit', function () {
    $("#uiBDH").hide();
    $("#btnSave").hide();
	$("#popUpBtn").hide();
	$("#filters").hide();
	$("#chk-ii").click(()=>{
		$("#filters").toggle();
	})
	
	$("#mainPage").disableSelection()
    $('#fileUploadForm').on('submit', function (e) {
		if($("#chk-gv")[0].checked || $("#chk-ii")[0].checked){
			e.preventDefault();
			var fileInput = $('#fileToUpload')[0];
			if (fileInput.files.length > 0) {
				var selectedFile = fileInput.files[0];
				if (selectedFile.type === 'application/javascript' || selectedFile.name.endsWith('.js')) {
					readAndLogFileContent(selectedFile);
				} else {
					alert('Precisa Ser um Arquivo .js');
				}
			} else {
				alert('Select the file before sending it! (data.js)');
			}
		}else{
			e.preventDefault();
			alert("Selecione um ou mais filtros para Editar ou Visualizar!");
		}
    });
	
});

function readAndLogFileContent(file) {
	showLoading();
    var reader = new FileReader();
    reader.onload = function (event) {
        var fileContent = event.target.result;
        try {
            const data = JSON.parse(fileContent);
			//console.log(data);
            if (typeof data.project[8] === 'string' && typeof data.project[26] === 'string') {
                $("#info")[0].innerText = "File uploaded successfully!";
                $('#info').css('color', 'green');
                $("#info").hide("slow", () => {
                    $("#fileUploadForm").hide("slow", () => {
						
						const proj_data = `
							<div class="ui-body ui-body-b ui-corner-all">
							<h3>Project Details</h3>
							<p><strong>Project Name:</strong> ${data.project[26]}</p>
							<p><strong>Project Version:</strong> ${data.project[16]}</p>
							<p><strong>First Layout:</strong> ${data.project[1]}</p>
							<p><strong>Window Width (initial):</strong> ${data.project[10]} px</p>
							<p><strong>Window Height (initial):</strong> ${data.project[11]} px</p>
							<p><strong>Sounds Folder:</strong> ${data.project[8]}</p>
							</div>`;
                        $("#mainPage").append(proj_data);
						
						//GEN_GV_BL;
						if($("#chk-gv")[0].checked){
                            for (let layoutIndex = 0; layoutIndex < data.project[6].length; layoutIndex++) {
                                var layoutIndexHeader = `
								  <div class="ui-body ui-body-a ui-corner-all" headers-theme>
									<h3>LAYOUT: ${data.project[6].at(layoutIndex)[0]}</h3> 
								  </div>
								`;
                                $("#uiBD").append(layoutIndexHeader);
                                for (let varIndex = 0; varIndex < data.project[6].at(layoutIndex)[1].length; varIndex++) {
                                    var collContent = `
										<div data-role='collapsible'>
										<h4>${(typeof data.project[6].at(layoutIndex)[1][varIndex][1] == 'string') ? varIndex + " | " + data.project[6].at(layoutIndex)[1][varIndex][1] : varIndex + " | " +"<span style='color: red'>Complex Type<span>"}</h4>	
										<p>Constant: <span style="${(data.project[6].at(layoutIndex)[1][varIndex][5]) ? 'color: red;' : 'color: green;'}">${(data.project[6].at(layoutIndex)[1][varIndex][5]) ? "Yes" : "No"}</span></p>
										<p>Type: ${typeof data.project[6].at(layoutIndex)[1][varIndex][3] == "number" ? "Number" : "Text"}</p>
										<label for="text-basic">Initial Value:</label>
										<input type="text" varIndex="${layoutIndex}|${varIndex}" name="text-basic" id="varValue" value="${data.project[6].at(layoutIndex)[1][varIndex][3]}">
										</div>
										`;
                                    var newCollapsible = $(collContent);
                                    newCollapsible.collapsible();
                                    $("#uiBD").append(newCollapsible);
                                }
                            }
							hideLoading();
							
						}//END_GV_BL
						
						if($("#chk-ii")[0].checked){
							const sep = "<div class='ui-bar ui-bar-a'></div>";							
							$("#uiBD").append(sep);
							
							for (let layoutIndex = 0; layoutIndex < data.project[5].length; layoutIndex++) {
								//console.log("LAYOUT: ", data.project[5][layoutIndex]);
								
								for(let layerIndex = 0; layerIndex < data.project[5][layoutIndex][6].length; layerIndex++){
									//console.log("LAYER: ", data.project[5][layoutIndex][6][layerIndex]);
								
									for(let instanceIndex = 0; instanceIndex < data.project[5][layoutIndex][6][layerIndex][14].length; instanceIndex++){
										//console.log(data.project[5][layoutIndex][6][layerIndex][14][instanceIndex]);
										var collContent = ` `;
									
										let ADD_FINAL_CONTENT = (type) =>{
											if(type == "text"){
												collContent +=	`
													<p><strong>Layout:</strong> ${data.project[5][layoutIndex][0]}<p>
													<p><strong>Layer:</strong> ${data.project[5][layoutIndex][6][layerIndex][0]}</p>
													<label for="posX"><strong>pos_X:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posX" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][0]}">
													<label for="posY"><strong>pos_Y:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posY" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][1]}">
														
													<label for="sizeW"><strong>size_W</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeW" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][3]}">
													<label for="sizeH"><strong>size_H:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeH" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][4]}">
												`;
												
												collContent += `
													<div class="ui-corner-all custom-corners">
													  <div class="ui-bar ui-bar-a">
													    <h4>Instance Variables</h4>
													  </div>
												  <div class="ui-body ui-body-a">
												`;
											}else if(type == "sprite"){
												collContent +=	`
													<p><strong>Layout:</strong> ${data.project[5][layoutIndex][0]}<p>
													<p><strong>Layer:</strong> ${data.project[5][layoutIndex][6][layerIndex][0]}</p>
													<p><strong>Anim_Name:</strong> ${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][1]}</p>
													<label for="posX"><strong>pos_X:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posX" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][0]}">
													<label for="posY"><strong>pos_Y:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posY" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][1]}">
														
													<label for="sizeW"><strong>size_W</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeW" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][3]}">
													<label for="sizeH"><strong>size_H:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeH" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][4]}">
												`;
												
												collContent += `
													<div class="ui-corner-all custom-corners">
													  <div class="ui-bar ui-bar-a">
													    <h4>Instance Variables</h4>
													  </div>
												  <div class="ui-body ui-body-a">
												`;
											}else if(type == "unknown"){
												collContent +=	`
													<p><strong>Layout:</strong> ${data.project[5][layoutIndex][0]}<p>
													<p><strong>Layer:</strong> ${data.project[5][layoutIndex][6][layerIndex][0]}</p>
													<label for="posX"><strong>pos_X:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posX" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][0]}">
													<label for="posY"><strong>pos_Y:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="posY" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][1]}">
														
													<label for="sizeW"><strong>size_W</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeW" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][3]}">
													<label for="sizeH"><strong>size_H:</strong></label>
													<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="sizeH" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][4]}">
												`;
												
												collContent += `
													<div class="ui-corner-all custom-corners">
													  <div class="ui-bar ui-bar-a">
													    <h4>Instance Variables</h4>
													  </div>
												  <div class="ui-body ui-body-a">
												`;
											}
												
											if(data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][3].length){
												//console.log("VARIABLE: ", data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][3]);
												for(let instanceVarIndex = 0; instanceVarIndex < data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][3].length; instanceVarIndex++){												
													collContent += `
														<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}|${instanceVarIndex}" name="instanceVar" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][3][instanceVarIndex]}">	
													`;	
												}
											}else{
												collContent += `
															<p>Instance without Variables</p>
														</div>
													</div>
												`;
											}
												
											collContent += `
													</div>
												</div>
											`;
												
											var newCollapsible = $(collContent);
											newCollapsible.collapsible();
											$("#uiBD").append(newCollapsible);												
										}
										
										if(typeof data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][0] == 'string' && $("#typeText")[0].checked){
											collContent += `<div data-role='collapsible'><h4>Instance - UID: ${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][1]}|${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][2]} / <strong>Type:</strong> <span style="color: green;">*Text </span></h4>`;
											collContent += `
												<label for="txtC"><strong>TextContent: </strong></label>
												<input type="text" varIndex="${layoutIndex}|${layerIndex}|${instanceIndex}" name="txtC" id="instanceData" value="${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][0]}">
											`;
											ADD_FINAL_CONTENT("text");
										}
										if(typeof data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][1] == 'string' && $("#typeSprite")[0].checked){
											collContent += `<div data-role='collapsible'><h4>Instance - UID: ${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][1]}|${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][2]} / <strong>Type:</strong> <span style="color: blue;">*Sprite </span></h4>`;
											ADD_FINAL_CONTENT("sprite");
										}
										if((typeof data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][0] == 'number') && (typeof data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][1] == 'number') && $("#typeUnk")[0].checked){										
											collContent += `<div data-role='collapsible'><h4>Instance - UID: ${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][1]}|${data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][2]} / <strong>Type:</strong> <span style="color: red;">Unknow Type </span></h4>`;	
											ADD_FINAL_CONTENT("unknown");
										}
									}//
								}//INSTANCE_FOR
							}//LAYOUT_FOR
							hideLoading();
						}
						
                        $("#btnSave").show();
                        $("#btnSave").click(() => {
                            saveDataJS(data);
                        });
                    });
                });
            }
        } catch (err) {
            $('#info').css('color', 'red');
            $("#info")[0].innerText = "Invalid File! Try again...";
        }
    };
    reader.readAsText(file);
}

function showLoading(){
	$("#popUpBtn").click()
}
function hideLoading(){
	$("#popupBasic").hide();
}
function saveDataJS(data) {
	
	if($("#chk-gv")[0].checked){
		for (let i = 0; i < $("input[name*='text-basic']").length; i++) {
			let currentValue = $("input[name*='text-basic']")[i].value
			let [layoutIndex, varIndex] = $("input[name*='text-basic']")[i].getAttribute("varindex").split("|");
			if (typeof data.project[6].at(layoutIndex)[1][varIndex][1] == 'string') {
				if (!isNaN(currentValue)) {
					//number
					data.project[6].at(layoutIndex)[1][varIndex][3] = parseInt(currentValue);
				} else {
					//string
					data.project[6].at(layoutIndex)[1][varIndex][3] = currentValue;
				}
			}
		}
	}
	
	if($("#chk-ii")[0].checked){
		//TEXT_CONTENT
		for (let i = 0; i < $("input[name*='txtC']").length; i++) {
			let textC = (!isNaN($("input[name*='txtC']")[i])) ? "Text" : $("input[name*='txtC']")[i].value;
			let [layoutIndex, layerIndex, instanceIndex] = $("input[name*='txtC']")[i].getAttribute("varindex").split("|");
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][5][0] = textC;
		}
		//POS_X + POS_Y + SIZE_W + SIZE_H;
		for (let i = 0; i < $("input[name*='posX']").length; i++) {
			let posX = $("input[name*='posX']")[i].value;
			let posY = $("input[name*='posY']")[i].value;
			let sizeW = $("input[name*='sizeW']")[i].value;
			let sizeH = $("input[name*='sizeH']")[i].value;
			let [layoutIndex, layerIndex, instanceIndex] = $("input[name*='posX']")[i].getAttribute("varindex").split("|");
			
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][0] = posX;
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][1] = posY;
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][3] = sizeW;
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][0][4] = sizeH;
		}
		//INSTANCE_VAR
		for(let i = 0; i < $("input[name*='instanceVar']").length; i++){
			let value = $("input[name*='instanceVar']")[i].value;
			let [layoutIndex, layerIndex, instanceIndex, instanceVarIndex] = $("input[name*='instanceVar']")[i].getAttribute("varindex").split("|");
			console.log(value, layoutIndex, layerIndex, instanceIndex, instanceVarIndex);
			data.project[5][layoutIndex][6][layerIndex][14][instanceIndex][3][instanceVarIndex] = value;
		}
		
	}
	
    const finalFile = JSON.stringify(data);
    const blob = new Blob([finalFile], {
        type: 'application/javascript'
    });
    saveAs(blob, 'data.js');
}
