# illegal-validator
A decent easy to use jquery form validator 


#### CDN

To start working with Illegal Validator right away, there's a couple of CDN choices availabile
to serve the files as close, and fast as possible to your users:

- comming soon

#### Browser support

Jquery Illegal validator works on IE8+ in addition to other modern browsers such as Chrome, Firefox, and Safari.

#### Depedencies

- jquery: >=1.10.2
- bootstrap: >=3.0.0
- fontawesome: ~4.1.0 

Just add a link to the css file in your `<head>`:
```html
<link rel="stylesheet" type="text/css" href="/jquery-illegal/illegal-validator/dist/css/jquery.illegal.css"/>
```

Then, before your closing ```<body>``` tag add:

```html
<script type="text/javascript" src="/jquery-illegal/illegal-validator/dist/js/jquery.illegal.js"></script>
```


#### Package Managers

```sh
# Bower
bower install --save illegal-validator

```

#### Sample Form

```html
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
			<input type='text'  class='form-control' rules="required|numeric|max:3">
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
	<div class="form-group">
	<label for="sel1">Select list:</label>
	<div class='input-group'>
	<select class="form-control" id="sel1" rules='required'>
		<option value >0</option>
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
```

Simply remove "rules" from the html tag to exclude it from validation.

#### Validation Rules

Name | Rule | Description
------ | ---- | -----------
Alphabetics Only | alpha | Only Alphabatic characters are allowed
Alphabetics & Numeric |alphaNum | Only Alphabatic and numbers are allowed
Numeric | numeric | Only Numbers are allowed
Email | email | Only a valid email address allowed
Phone | phone | Only a valid phone number allowed
Minimum Length| min:<n> | Must reach minimum length (Example : Min:6)
Maximum Length| max:<n> | Set limitation to character/string length  (Example : Max:22)

#### Simple Initialization

```javascript
$(function(){
	$('.illegal-form').illegal();
});
```

#### Initialization with custom regular expression

```javascript
$(function(){
	$('.illegal-form').illegal({
		"nric" : [ /^[STFG]\d{7}[A-Z]$/ ,"Please enter a valid NRIC number"], //Custom Regex
	});
});
```
Html tag

```html
 <div class='form-group'>
	<label>NRIC</label>
	<div class='input-group'>
	    <input type='text'  class='form-control' rules="required|nric">
	</div>
 </div>
```
#### Ajax Live Check

set il-ajax-check = < URL> attribute in the input tag to perform live ajax query.

```html
<div class='input-group'>
    <input type='text' class='form-control' rules="required|email|alpha|max:20|min:7" il-ajax-check='check.php' >
</div>
```
Server Side(Example):
Value sent trought post method with "val" parameter.

```php
<?php
if($_POST[val] && $_POST[val] === "available_email@domain.com"){
	echo 1;
}else{
	echo 0;
}
```
#### License

Copyright (c) 2016 Ryvan Prabhu

Licensed under the MIT license.

