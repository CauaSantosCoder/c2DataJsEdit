//@CauaSantos - Skull
		//Created on: 01/11/2023
		//index.js
		//jQuery 1.11.1
		
		$(document).on('pageinit', function () {
			$("#uiBDH").hide();
			$("#btnSave").hide();
			$('#fileUploadForm').on('submit', function (e) {
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
			});
		});
		
		function readAndLogFileContent(file) {
			var reader = new FileReader();
			reader.onload = function(event) {
			var fileContent = event.target.result;
			try{
				const data = JSON.parse(fileContent);
				if(typeof data.project[8] === 'string' && typeof data.project[26] === 'string'){
					$("#info")[0].innerText = "File uploaded successfully!";
					$('#info').css('color', 'green');
					
					$("#info").hide("slow", ()=>{
						$("#fileUploadForm").hide("slow", ()=>{
							$("#uiBDH").show("slow", ()=>{
								for(let layoutIndex=0; layoutIndex < data.project[6].length; layoutIndex++){
									var layoutIndexHeader = `
										<h3>Layout: ${data.project[6].at(layoutIndex)[0]}</h3> 
									`;
										
									$("#uiBD").append(layoutIndexHeader);
										
									for(let varIndex=0; varIndex < data.project[6].at(layoutIndex)[1].length; varIndex++){
										var collContent = `
											<div data-role='collapsible'>
												<h4>${(typeof data.project[6].at(layoutIndex)[1][varIndex][1] == 'string') ? varIndex + " | " + data.project[6].at(layoutIndex)[1][varIndex][1] : varIndex + " | " +"<span style='color: red'>Complex Type<span>"}</h4>	
												<p>Constant: <span style="${(data.project[6].at(layoutIndex)[1][varIndex][5]) ? 'color: red;' : 'color: green;'}">${(data.project[6].at(layoutIndex)[1][varIndex][5]) ? "Yes" : "No"}</span></p>
												<p>Type: ${typeof data.project[6].at(layoutIndex)[1][varIndex][3] == "number" ? "Number" : "Text"}</p>
												<label for="text-basic">Initial Value:</label>
												<input type="text" varIndex="${layoutIndex}|${varIndex}" name="text-basic" id="varValue" value="${data.project[6].at(layoutIndex)[1][varIndex][3]}">
											</div>`;
										var newCollapsible = $(collContent);
										newCollapsible.collapsible();
										$("#uiBD").append(newCollapsible);
									}
								}
								const proj_data = `
									<div class="ui-body ui-body-b ui-corner-all">
										<h3>Project Details</h3>
										<p><strong>Project Name:</strong> ${data.project[26]}</p>
										<p><strong>Project Version:</strong> ${data.project[16]}</p>
										<p><strong>First Layout:</strong> ${data.project[1]}</p>
										<p><strong>Window Width (initial):</strong> ${data.project[10]} px</p>
										<p><strong>Window Height (initial):</strong> ${data.project[11]} px</p>
										<p><strong>Sounds Folder:</strong> ${data.project[8]}</p>
										<p ><strong>PC2_HASH:</strong> ${md5(parseInt(data.project[12] + data.project[20]))}<p>
										<p ><strong>soL:</strong> ${md5(parseInt(data.project[12] + data.project[20]))}<p>
								    </div>`;
									
									$("#mainPage").append(proj_data);
									$("#btnSave").show();
									$("#btnSave").click(()=>{
										saveDataJS(data);
									});
								});
							});
						});
					}
				}catch(err){
					$('#info').css('color', 'red');
					$("#info")[0].innerText = "Invalid File! Try again...";
				}
				
			};
			reader.readAsText(file);
			
			
			function saveDataJS(data){
				for(let i=0; i < $("input[name*='text-basic']" ).length; i++){
					let currentValue = $( "input[name*='text-basic']" )[i].value
					let [layoutIndex, varIndex]= $( "input[name*='text-basic']" )[i].getAttribute("varindex").split("|");
					
					
					
					if(typeof data.project[6].at(layoutIndex)[1][varIndex][1] == 'string'){					
						if(!isNaN(currentValue)){
							//number
							data.project[6].at(layoutIndex)[1][varIndex][3] = parseInt(currentValue);
						}else{
							//string
							data.project[6].at(layoutIndex)[1][varIndex][3] = currentValue;
						}

					}
				}
				
				const finalFile = JSON.stringify(data);
				const blob = new Blob([finalFile], { type: 'application/javascript' });
				saveAs(blob, 'data.js');
			}
		}
