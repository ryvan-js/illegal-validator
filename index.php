<!DOCTYPE html>
<html>
<head>
<title>Illegal Sample</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href='bower_components/bootstrap/dist/css/bootstrap.css' rel='stylesheet' />
<link href='bower_components/font-awesome/css/font-awesome.css' rel='stylesheet' />
<link href='illegal/dist/css/illegal-jquery.css' rel='stylesheet' />
<script src='bower_components/jquery/dist/jquery.js'></script>
<script src='illegal/src/js/jquery.illegal.js'></script>
</head>
<body>
<div class='container'>
<form class='illegal-form'>
	<div class='form-group'>
	<label>Email</label>
	<div class='input-group'>
		<input type='text' class='form-control' rules="required|email|alpha|max:20|min:7" il-ajax-check='check.php' >
		
	</div>
	</div>
	<div class='form-group'>
	<label>Age</label>
	<div class='input-group'>
		<input type='text'  class='form-control' rules="required|nric">
		
	</div>
	</div>
	<div class='form-group'>
	<label>Phone</label>
	<div class='input-group'>
		<input type='text' class='form-control' rules="required|numeric|min:9|max:18">
		
	</div>
	</div>

	<div class='form-group'>
	<label>Password</label>
	<div class='input-group'>

		<input type='text' name='password' id='password' class='form-control' >
		
		
	</div>
	</div>

	<div class='form-group'>
	<label>Date</label>
	<div class='input-group'>
	<input type='date' name='password' id='password' class='form-control'  rules="required">
	</div>
	</div>
	<div class='form-group'>
	<label>Password_confirmation</label>
	<div class='input-group'>
	<input type='text' name='password_confirmation' class='form-control' rules="required|numeric|min:6|max:9|confirmation:password" >
	</div>
	</div>

	<div class='form-group'>
	<label>Remark</label>
	<div class='input-group'>
		<textarea type='text' class='form-control' rules="required|numeric|min:9|max:8"></textarea> 
		
	</div>
	</div>
	<div class="checkbox">
	<label><input type="checkbox" value="1" rules='required' >Agree</label>
	</div>
	<div class='form-group'>
		<div class="radio">
		<label><input type="radio" name="optradio">Option 1</label>
		</div>
		<div class="radio">
		<label><input type="radio" name="optradio">Option 2</label>
		</div>
		<div class="radio disabled">
		<label><input type="radio" name="optradio" disabled>Option 3</label>
		</div>
	</div>
	<div class="form-group">
	<label for="sel1">Select list:</label>
	<div class='input-group'>
	<select class="form-control" id="sel1" rules='required'>
		<option value=>0</option>
		<option value=1>1</option>
		<option value=2>2</option>
		<option value=3>3</option>
		<option value=4>4</option>
	</select>

	</div>
	</div>
<div class='form-group'>
	<input type='submit' value='Go'>	
</div>
</form>

</div>
<script>
(function($){
	$(function(){
		$('.illegal-form').illegal({
			"nric" : [ /^[STFG]\d{7}[A-Z]$/ ,"Please enter a valid NRIC number"],
			"nric_sg" : [ /^[STFG]\d{7}[A-Z]$/ ,"Please enter a valid NRIC number"]
		});
	});
})(jQuery);

</script>
</body>
</html>
