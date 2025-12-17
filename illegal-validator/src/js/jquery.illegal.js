!function(){

		var regex_pattern = {
			email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
			numeric:/^[0-9]+$/,
			phone:/^[+0-9]+$/,
			alpha:/^[a-z]+$/i,
			alphaNum:/^[a-z0-9]+$/i
		};

		var messages = {
			email:"Please enter a valid email address",
			numeric :"Please enter numeric value",
			phone: "Please enter a valid phone number",
			alpha:"The value must be alphabatics",
			alphaNum:"The value must be only alphabetics or numeric",
			max:"This value reached the maximun length",
			min:"This value must reach the minimum length"
		};

		var live_check = ['email'];
		var strict_rules = ['numeric','alpha','phone','max'];


		var hover_board="<div class='hover-board'><ul></ul></div>";
		var min_counter = function(count){return "<li for='min'><i class='fa invalid'></i> Min Length : <strong>"+count+"</strong></li>";}
		var max_counter = function(count){return "<li for='max'><i class='fa fa-info-circle' aria-hidden='true'></i> Max Length : <strong>"+count+"</strong></li>";}
		var confirmation = function(count){return "<li for='confirmation'><i class='fa invalid'></i> "+count+"</li>";}
		var check = function(msg){return "<li for='check'><i class='fa spinner'></i> "+msg+"</li>";}
		var size_valid;

		//custom functions
		Array.prototype.regexMatch = function(regex){
			if(typeof this === "object"){
			    for(a = 0 ;a < this.length; a++){;
			        if(this[a].match(regex)){
			            return a;
			        }
			    }
			    return false;
			}
		}


		var validator = function(rule,field_value,event,elem){
			keyVal = String.fromCharCode(event.keyCode || event.which).replace(/'/g, "\\'").replace(/\0/g,"");//get key values on every keypress and escapes quotes since we gonna use eval for dynamic validation for restricted input.
			isValid = true;
			isStrict = false; 
			//console.log(isNaN(keyVal));
			beforeValue = field_value.replace(/\s/g,'');//lock it under local scope
			value = field_value.replace(/\s/g,'')  + keyVal;//lock it under local scope
			minValid = true;
			maxValid = true;
			matched = true;
			available = false;
			
			$.each(rule,function(index,rule){
			
			if(rule.match(new RegExp(":"))){

				this.length_rule = rule.split(":");

				if(this.length_rule.length == 2 && !isNaN(this.length_rule[1]) && typeof parseInt(this.length_rule[1]) == 'number'){ 
					//console.log(parseInt(this.length_rule[1]));
					switch(this.length_rule[0]){
						case "min":
						minValid = (new RegExp('^[a-z\s*A-z0-9\s*]{'+this.length_rule[1]+',}','g')).test(value);
							if(minValid)
								$(elem).parent().find('.hover-board [for=min] i')
									.removeClass('invalid')
									.addClass('valid');
							else
								$(elem).parent().find('.hover-board [for=min] i')
									.removeClass('valid')
									.addClass('invalid');
								//minValid = false;
						break;
						case "max":
						maxValid = (new RegExp('^[a-z\s*-z0-9\s*]{'+this.length_rule[1]+'}','g')).test(beforeValue);
							if(maxValid)
								isStrict = true;
						break;
					rules.splice(rules.indexOf(rule),1);

					}
					

					//if(!isValid)
						//console.log("size invalid : "+messages[this.length_rule[0]]);
				}

				//console.log(this.length_rule[1]);
				if(this.length_rule[0] === "confirmation"){
					var partner_value = $('#'+this.length_rule[1]).val();
					if(partner_value && partner_value === value){
						$(elem).parent().find('.hover-board')
							.find('[for=confirmation] i')
							.removeClass('invalid')
							.addClass('valid');
						matched = true;
						}else{
						$(elem).parent().find('.hover-board').find('[for=confirmation] i').removeClass('valid').addClass('invalid');
						matched = false;
					}
				}
				
			}
		
			if(true){
				if(rule.match(/^regex:/)){
					var pattern = rule.match(/^regex:(.*)$/);
					if(pattern[1]){
						try{
							var temp = (new RegExp(pattern[1])).test(value);
						}catch(e){
							var temp = false;
						}
						if(isValid) isValid = temp;
					}
				}
				if($.inArray(rule,Object.keys(regex_pattern)) > -1){
					var temp = regex_pattern[rule].test(value);
					if(isValid) isValid = temp;
					if(isValid && ($(elem).attr('il-ajax-check') && $(elem).attr('il-ajax-check') !== "") && $.inArray(rule,live_check) > -1){
						var hover_board_elem = $(elem).parent().find(".hover-board ul");
						
						if(!hover_board_elem.length){
								hover_board_elem = $(elem).parent().append(hover_board).find('ul');
						}
						

						if(!hover_board_elem.find("[for=check]").length) hover_board_elem.append(check("Checking"));
						$.ajax({
							url:$(elem).attr('il-ajax-check'),
							data:{val:value},
							type:"post",
							success:function(r){
								hover_board_elem.find("[for=check]").remove();
								if(r === "1" || r === 1){
									hover_board_elem.append(check("Available"));
									hover_board_elem.find("[for=check] .spinner").removeClass("invalid").addClass('valid');
									available = true;
									$(elem).attr('isvalid',true);
									$(elem).parent().find('.input-group-addon .flipper').addClass('is-valid');
								}else{
									hover_board_elem.append(check("Unavailable"));
									hover_board_elem.find("[for=check] .spinner").removeClass("valid").addClass('invalid');
									available = false;
								}
							}
						});
						setTimeout(1000);
						console.log("after:"+available)
					}else{
						available = true
						//$(elem).parent().find(".hover-board ul")
					}
				}
			}

			//check if its a restricted input ,if yes send block signal by isStrict = true
			if(($.isArray(keyVal,[8,46,9,37,38,39,40,16]) > -1)){ 
				if(strict_rules.indexOf(rule) > -1 && !isStrict){
					//console.log('strict');
					eval("isStrict = !regex_pattern."+rule+".test('"+keyVal+"')");//eval is not evil , just misunderstood
				}
			}
				
			//if(typeof available != 'undefined') available = true;

			if(isValid && minValid  && matched && available){
				isValid = true;
			}else{
				isValid = false;
			}
			
				result = {isValid:isValid,isStrict:isStrict};
			});
				size_valid = {max:maxValid,min:minValid};
				
				return Object.assign(result,size_valid);
		}

		var Processor = function(form,options){
			this.form = form; //lock it under local scope
			//crawl the form and look for required fields

			$(this.form).find('[rules]').each(function(index,elem){

				if($(elem).prop("disabled")){
						
				}

				$(elem).attr('isvalid',false);
				$(elem).parent().find('.input-group-addon').remove();
				if($(elem).attr('type')!=='checkbox'){
					var input_group='<span class="input-group-addon" id="email-addon">\
								<div class="required">\
								<i class="fa fa-circle"></i>\
								</div>\
								<div class="flipper">\
								<div class="flip-object">\
								<i class="fa fa-circle-o invalid"></i>\
								<i class="fa fa-check valid"></i>\
								</div>\
								</div>\
								</span>';	
					$(elem).parent().append(input_group);
				}

				if($(this).attr('rules').split("|").indexOf("required") > -1){
					$(this).parent().find('.input-group-addon').addClass('is-required');
					if($(this).prop('type') == "checkbox"){
						$(this).parent().parent().addClass('is-required');
					}

					if($(this).is("select")){
						//$(this).parent().addClass('is-required');
					}

				}

				e_rules = $(elem).attr('rules').split("|");
				refined = false;

				$.grep($(elem).attr('rules').split("|"),function(rule){
					rules_array = $.map(regex_pattern,function(value,index){ return [index] });
					
					new_rules = [];
					if($(elem).attr('stop-loop') !== "true"){

						// if(e_rules.regexMatch(/^regex/)){
						// 	e_rules.splice(e_rules.regexMatch(/^regex/),1);
						// 	e_rules.log(rules);
						// }
						if($.map(regex_pattern,function(value,index){ return [index] }).indexOf(rule) > -1 || rule.match(/^regex:/)){

							if(rule.match(/^regex:/)){
								$(elem).parent().parent().find('label').attr('illegal-msg',"Invalid input");
							}else{
								$(elem).parent().parent().find('label').attr('illegal-msg',(messages[rule]));
							}

							
							//clean up extra regex  patterns
								preserve_first_rule = rule;
								var temp_array = e_rules;
									$.each(temp_array,function(index,rule){
										this.regex_pattern = $.map(regex_pattern,function(value,index){ return [index] });
										//console.log("["+index+"]execute:"+temp_array[index]+" > found on pos:"+temp_array.indexOf(rule)+" of "+temp_array);
										if(this.regex_pattern.indexOf(rule) > -1 || rule.match(/^regex:/)){
											
										}else{
											new_rules.push(rule);
											//console.log(new_rules);
										}

									});
								
								if(e_rules.regexMatch(/^min|max|confirmation/)){
										$(elem).parent().append(hover_board);
										if(e_rules.regexMatch(/^confirmation/))
											$(elem).parent().find(".hover-board ul").append(confirmation("Value dint match"));
										if(e_rules.regexMatch(/^min/)){
											//console.log(e_rules)
											min_count = e_rules[e_rules.regexMatch(/^min/)].match(/^min:([a-z0-9\-]+)$/);
											$(elem).parent().find(".hover-board ul").append(min_counter(min_count[1]));}
										if(e_rules.regexMatch(/^max/))											
											max_count = e_rules[e_rules.regexMatch(/^max/)].match(/^max:([a-z0-9\-]+)$/);

											if(parseInt(min_count[1]) > parseInt(max_count[1])){
												//console.log(max_count[1]);
												new_rules.splice(new_rules.regexMatch(/^max/),new_rules.regexMatch(/^max/)+1);
											}else{
												$(elem).parent().find(".hover-board ul").append(max_counter(max_count[1]));
											}
								}


								
								new_rules.push(preserve_first_rule);
								$(elem).attr('rules',new_rules.join('|'));
								$(elem).attr('stop-loop',true);
								refined = true;
						}	
					}

				});

				if(!refined){
					if(e_rules.regexMatch(/^min|max|confirmation/)){
						if(typeof new_rules !== "undefined" && new_rules.length > 0) e_rules = new_rules;
						$(elem).parent().append(hover_board);

						if(e_rules.regexMatch(/^confirmation/))
							$(elem).parent().find(".hover-board ul").append(confirmation("Value dint match"));
						if(e_rules.regexMatch(/^min/)){
							min_count = e_rules[e_rules.regexMatch(/^min/)].match(/^min:([a-z0-9\-]+)$/);
							$(elem).parent().find(".hover-board ul").append(min_counter(min_count[1]));}
						if(e_rules.regexMatch(/^max/)){
							console.log('max detected');											
							max_count = e_rules[e_rules.regexMatch(/^max/)].match(/^max:([a-z0-9\-]+)$/);
							if(parseInt(min_count[1]) > parseInt(max_count[1])){
								e_rules.splice(e_rules.regexMatch(/^max/),e_rules.regexMatch(/^max/)+1);
							}else{
								$(elem).parent().find(".hover-board ul").append(max_counter(max_count[1]));
							}
						}
		
					}
			
				}
				this.label = $(this).parent().find('input[type]').parent().parent().find('label');
				if($(this).is('textarea'))this.label = $(this).parent().parent().find('label');
				
				if(!($(elem).prop('type') == 'checkbox')){
				this.label.attr('label-text',this.label.html());
				}

				//this.label.attr('label-text',this.label.html());
			});

			$(this.form).find('[rules][type]').on('focus',function(){
				if($(this).attr('type') !== 'checkbox'){
					this.label = $(this).parent().parent().find('label');
					if($(this).attr('isvalid') === "false" || typeof $(this).attr('isvalid') === 'undefined'){
						this.label.html(this.label.attr('illegal-msg'));
					}else if(this.label.attr('isvalid') === "true" ){
						this.label.html(this.label.attr('label-text'));
					}
				}
			});

			$(this.form).find('[rules][type]').on('blur',function(){
				this.label = $(this).parent().parent().find('label');
				this.label.html(this.label.attr('label-text'));
			});

			$(this.form).find('[rules]').on('keypress propertychange input change focus blur',function(e){ //input propertychange paste  

				//deal with checkbox
				if($(this).is(':checked')){
					$(this).attr('isvalid',true);
					$(this).parent().parent().removeClass('is-required').addClass('is-valid');
				}else{
					$(this).attr('isvalid',false);
					$(this).parent().parent().removeClass('is-valid').addClass('is-required');
				}

				if($(this).find("option").is(":selected")){
					if ($(this).find("option:selected").val().length) {	
						$(this).attr('isvalid',true);				
	   				 	$(this).parent().find('.input-group-addon').removeClass('is-required').find('.flipper').addClass('is-valid');
	  				}else{
	  					$(this).attr('isvalid',false);
	  				 	$(this).parent().find('.input-group-addon').removeClass('is-required').find('.flipper').addClass('is-required');	
	  				}
  				}

  				if($(this).prop('type') === 'date'){
  					if ($(this).val().length) {	
  						$(this).attr('isvalid',true);				
   				 		$(this).parent().find('.input-group-addon').removeClass('is-required').find('.flipper').addClass('is-valid');
  					}else{
  						$(this).attr('isvalid',false);		
  				 		$(this).parent().find('.input-group-addon').removeClass('is-required').find('.flipper').addClass('is-required');	
  					}
  				}

				rules = $(this).attr('rules').split("|").filter(Boolean); //this is under local scope since we not gonna call it from anywhere else;
				var field_value = $(this).val(); //declare the field value as parent global scope as we gonna call it from child later.
				var active_element = $(this); // declare the current active element as parent global scope as well
				block_inputs = false; //declare

				if(rules.indexOf('required') > -1){
					var required = true;
					rules.splice(rules.indexOf('required'),1);
				}

				if(rules.length > 0){
					//$.each(rules,function(index,rule){
						$(active_element).parent().find('.input-group-addon').removeClass('is-required');
							this.validator = validator(rules,field_value,e,active_element);
							console.log(this.validator);
							if(this.validator.isValid){
								$(active_element).attr('isvalid',true);
								$(active_element).parent().find('.input-group-addon .flipper').addClass('is-valid');
							}else{
								$(active_element).attr('isvalid',false);
								$(active_element).parent().find('.input-group-addon .flipper').removeClass('is-valid');
							}
						block_inputs = this.validator.isStrict;
					//});			
				}
				
				if((field_value == "" || field_value == null ) && required){
					$(this).parent().find('.input-group-addon').addClass('is-required').find('.flipper').removeClass('is-valid');
					$(active_element).attr('isvalid',false);
				}

				if(block_inputs){
					return false;
				}

				
			});

			$(this.form).find('[rules]').on('keyup',function(e){
				//console.log('up!');
				var rules = $(this).attr('rules').split("|");
				var required = rules.indexOf('required') > -1;
				var field_value = $(this).val();
				$.each(rules,function(index,rule){
					//validator(rule,field_value,e,this);
				});
				if((field_value == "" || field_value == null )){
					if(required){
						$(this).parent().find('.input-group-addon').addClass('is-required').find('.flipper').removeClass('is-valid');
					}else{
						$(this).parent().find('.input-group-addon').find('.flipper').removeClass('is-valid');
					}
				}
			});

			$(this.form).on('submit',function(){
				if($(this).find("[rules][isvalid=false]").length > 0){
					$('html, body').animate({
				        scrollTop: $(this).find("[rules][isvalid=false]").offset().top
				    }, 600);
				    $(this).find("[rules][isvalid=false]:first").focus();
					return false;
				} 
			});
		};
		
				
		$.fn.illegal = function(opt){
		var opt=$.extend(opt,$.fn.illegal.defaults);
		//console.log(Object.keys(opt)[0]);
		for(i in opt){
			Object.defineProperty(regex_pattern,i, {
			  value: opt[i][0],
			  writable: true,
			  enumerable: true,
			  configurable: true
			});

			Object.defineProperty(messages,i, {
			  value: opt[i][1],
			  writable: true,
			  enumerable: true,
			  configurable: true
			});
		}
		
		var illegal = new Processor(this,opt);

		//console.log(regex_pattern);
		} 
		
		$.fn.illegal.defaults = {
			
		};
		


		


}(jQuery);