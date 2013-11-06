/*!
 * validetta - Client-side form validation jQuery plugin
 * Version: 0.4.0 (01 November 2013) | Copyright 2013 Hasan Aydoğdu - http://www.hasanaydogdu.com
 */
(function(g){var e={},a={},d=new RegExp(/(minChecked|maxChecked|minSelected|maxSelected|minLength|maxLength|equal|customReg)\[[(\w)-_]{1,15}\]/i),c=new RegExp(/^[a-zA-Z]{1}[\d\w\.-]+@[\d\w-]{3,}\.[\w]{2,3}(\.\w{2})?$/),b=new RegExp(/^[\+][0-9]+?$|^[0-9]+?$/);var f={empty:"This field is required. Please be sure to check.",email:"Your E-mail address appears to be invalid. Please be sure to check.",number:"You can enter only numbers in this field.",maxLength:"Maximum {count} characters allowed!",minLength:"Minimum {count} characters allowed!",checkbox:"This checkbox is required. Please be sure to check.",maxChecked:"Maximum {count} options allowed. Please be sure to check.",minChecked:"Please select minimum {count} options.",selectbox:"Please select an option.",maxSelected:"Maximum {count} selection allowed. Please be sure to check.",minSelected:"Minimum {count} selection allowed. Please be sure to check.",notEqual:"Fields do not match. Please be sure to check.",creditCard:"Invalid credit card number. Please be sure to check."};var h={errorClass:"validetta-error",errorCloseClass:"validetta-errorClose",ajax:{call:false,type:"GET",url:null,dataType:"html",beforeSend:g.noop,success:g.noop,fail:g.noop,complete:g.noop},realTime:false,onCompleteFunc:g.noop,customReg:{}};e=function(j,i){this.handler=false;this.options=g.extend(true,{},h,i);this.form=j;return this.events.call(this)};e.prototype.events=function(){var i=this;g(this.form).submit(function(j){a=this.querySelectorAll("[data-validetta]");return i.init.call(i,j)});if(this.options.realTime===true){g(this.form).find("[data-validetta]").not("[type=checkbox]").on("change",function(j){a=g(this);return i.init.call(i,j)});g(this.form).find("[data-validetta][type=checkbox]").on("click",function(j){a=i.form.querySelectorAll("[data-validetta][type=checkbox][name="+this.name+"]");return i.init.call(i,j)})}g(this.form).find("[type=reset]").on("click",function(){return i.reset.call(i)});g(this.form).on("click","."+this.options.errorCloseClass,function(){var j=this.parentNode;if(j){i.window.close.call(i,j)}return false})};e.prototype.init=function(r){var q=this;this.reset.call(this,a);for(var p=a.length-1;p>=0;p--){var s,m,o=[],l=[];s=a[p];m="";o=g(s).val();l=s.getAttribute("data-validetta").split(",");for(var n=l.length-1;n>=0;n--){if(l[n]==="required"){var k=s.getAttribute("type");if(k==="checkbox"&&!q.check.checkbox.checked(s)){m+=f.checkbox+"<br />"}else{if(s.tagName==="SELECT"&&!q.check.selectbox.selected(o)){m+=f.selectbox+"<br />"}}if((k==="text"||k==="password"||s.tagName==="TEXTAREA")&&!q.check.empty.call(q,o)){m+=f.empty+"<br />"}}if(l[n]==="number"&&!q.check.number(o)){m+=f.number+"<br />"}if(l[n]==="email"&&!q.check.mail(o)){m+=f.email+"<br />"}if(l[n]==="creditCard"&&o!==""&&!q.check.creditCard(o)){m+=f.creditCard+"<br />"}if(d.test(l[n])){var t=l[n].split(/\[|,|\]/);if(t[0]==="maxLength"&&!q.check.maxLength(o,t[1])){m+=f.maxLength.replace("{count}",t[1])+"<br />"}else{if(t[0]==="minLength"&&!q.check.minLength(o,t[1])){m+=f.minLength.replace("{count}",t[1])+"<br />"}else{if(t[0]==="maxChecked"&&!q.check.checkbox.maxChecked.call(q,s,t[1])){s=q.form.querySelectorAll("input[type=checkbox][data-validetta][name="+s.name+"]")[0];m+=f.maxChecked.replace("{count}",t[1])+"<br />"}else{if(t[0]==="minChecked"&&!q.check.checkbox.minChecked.call(q,s,t[1])){s=q.form.querySelectorAll("input[type=checkbox][data-validetta][name="+s.name+"]")[0];m+=f.minChecked.replace("{count}",t[1])+"<br />"}else{if(t[0]==="maxSelected"&&!q.check.selectbox.maxSelected(o,t[1])){m+=f.maxSelected.replace("{count}",t[1])+"<br />"}else{if(t[0]==="minSelected"&&!q.check.selectbox.minSelected(o,t[1])){m+=f.minSelected.replace("{count}",t[1])+"<br />"}else{if(t[0]==="equal"&&!q.check.equal.call(q,o,t[1])){m+=f.notEqual+"<br />"}else{if(t[0]==="customReg"&&!q.check.customReg(o,q.options.customReg[t[1]].method)){m+=(q.options.customReg[t[1]].errorMessage||f.empty)+"<br />"}}}}}}}}}}if(m!==""){q.window.open.call(q,s,m)}}if(r.type!=="submit"){return}else{if(q.handler===true){return false}else{if(q.options.ajax.call){q.ajax.call(q,arguments);return false}return q.options.onCompleteFunc(q,r)}}};e.prototype.check={empty:function(i){return(this.clear(i)==="")?false:true},mail:function(i){return((c.test(i)===false)&&i!=="")?false:true},number:function(i){return((b.test(i)===false)&&i!=="")?false:true},minLength:function(j,i){var k=j.length;return(k<i&&k!==0)?false:true},maxLength:function(j,i){return(j.length>i)?false:true},equal:function(j,i){return(g(this.form).find("input[name="+i+"]").val()!==j)?false:true},creditCard:function(k){var j,r,o,p,l,n,m=0,q;j=new RegExp(/[^0-9]+/g);r=k.replace(j,"");q=r.length;if(q<16){return false}for(l=0;l<q;l++){o=q-l;p=parseInt(r.substring(o-1,o),10);if(l%2===1){n=p*2;if(n>9){n=1+(n-10)}}else{n=p}m+=n}if(m>0&&m%10===0){return true}return false},checkbox:{checked:function(i){return(!i.checked)?false:true},maxChecked:function(k,i){var j=g(this.form.querySelectorAll("input[type=checkbox][name="+k.name+"]")).filter(":checked").length;return(j>i)?false:true},minChecked:function(k,i){var j=g(this.form.querySelectorAll("input[type=checkbox][name="+k.name+"]")).filter(":checked").length;return(j<i)?false:true}},selectbox:{selected:function(i){return(i===""||i===null)?false:true},maxSelected:function(j,i){return(j!==null&&j!==""&&j.length>i)?false:true},minSelected:function(j,i){return(j!==null&&j!==""&&j.length<i)?false:true}},customReg:function(k,i){var j=new RegExp(i);return((j.test(k)===false)&&k!=="")?false:true}};e.prototype.window={open:function(q,n){var m=q.parentNode;if(typeof m==="undefined"){m=q[0].parentNode}if(g(m).find("."+this.options.errorClass).length>0){return}var o,j,p,l,i,k;o=g(q).position();j=g(q).width();p=g(q).height();l=o.top;i=document.createElement("span");i.className=this.options.errorClass;k=document.createElement("span");k.innerHTML="x";k.className=this.options.errorCloseClass;g(i).empty().css({left:o.left+j+30+"px",top:l+"px"});m.appendChild(i);i.innerHTML=n;i.appendChild(k);this.handler=true},close:function(i){i.parentNode.removeChild(i);this.handler=false}};e.prototype.reset=function(k){var l={};if(typeof k==="undefined"||(k.length>1&&k[0].getAttribute("type")!=="checkbox")){l=g(this.form).find("."+this.options.errorClass)}else{l=g(k[0].parentNode).find("."+this.options.errorClass)}for(var j=l.length-1;j>=0;j--){this.window.close.call(this,l[j])}};e.prototype.clear=function(i){return i.replace(/^\s+|\s+$/g,"")};e.prototype.ajax=function(){var l,j,k=this,i;l=g(this.form).serialize();i=this.form.getAttribute("action");j=(this.options.ajax.url)?this.options.ajax.url:i;if(!this.options.ajax.url&&(i===""||i===null)){return console.log("Form action not valid !")}g.ajax({type:k.options.ajax.type,url:j,data:l,dataType:k.options.ajax.dataType,options:k.options,beforeSend:function(){return k.options.ajax.beforeSend()}}).done(function(m){k.options.ajax.success(k,m)}).fail(function(m,n){k.options.ajax.fail(m,n)}).always(function(m){k.options.ajax.complete(m)})};g.fn.validetta=function(i){if(g.validettaLanguage){f=g.extend(true,{},f,g.validettaLanguage.messages)}return this.each(function(){new e(this,i);return this})}})(jQuery);