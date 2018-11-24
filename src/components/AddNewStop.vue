<template>
<div>
<h1 class="title">Add New Stop </h1>
<form>

Description of Items:
<textarea rows="4" cols="50" class="Itemdesc"/></p>

Donor has donated before:<input type='checkbox'/></p>

Donor Phone:<input type='tel' placeholder="Phone Number"></p>
Donor Email:<input type='email' placeholder="Email"></p>
Donor Name:<input type='text' placeholder="First Name"> <input type='text' placeholder="Last Name"></p>

Is this {{searcheddonor}}?
<button>yes</button> <button>no</button><p/>	
</form>
<button>Save</button>
<button>Cancel</button>
</div>
</template>