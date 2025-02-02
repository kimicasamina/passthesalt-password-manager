(()=>{"use strict";var e={n:r=>{var t=r&&r.__esModule?()=>r.default:()=>r;return e.d(t,{a:t}),t},d:(r,t)=>{for(var s in t)e.o(t,s)&&!e.o(r,s)&&Object.defineProperty(r,s,{enumerable:!0,get:t[s]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r)};const r=require("@babel/runtime/helpers/asyncToGenerator");var t=e.n(r);const s=require("@babel/runtime/regenerator");var n=e.n(s);const a=require("express");var u=e.n(a);const o=require("dotenv");var i=e.n(o);const c=require("cookie-parser");var l=e.n(c);const d=require("body-parser");var p=e.n(d);const f=require("cors");var m=e.n(f);i().config();process.env.PASSTHESALT_CLIENT_URL;const v=require("helmet");var y=e.n(v);const g=require("bcryptjs");var b=e.n(g);const w=require("jsonwebtoken");var h=e.n(w);i().config();var x=function(e){return h().sign({id:e.id},process.env.JWT_SECRET,{expiresIn:"1h"})};const k=require("@babel/runtime/helpers/classCallCheck");var j=e.n(k);const q=require("@babel/runtime/helpers/createClass");var N=e.n(q);const T=require("sequelize");i().config();var U={development:{url:process.env.MYSQL_URL,dialect:"mysql"},production:{url:process.env.DB_URI,dialect:"postgres",dialectOptions:{ssl:{require:!0,rejectUnauthorized:!1}}}},_=U.production;const E=new T.Sequelize(_.url,{logging:!1}),D=require("uuid"),S=require("crypto");var I,R=e.n(S),P=R().createHash("sha256").update(process.env.SECURE_KEY).digest(),B="aes-256-cbc",O=function(e){console.log("Encryption...");var r=R().randomBytes(16),t=R().createCipheriv(B,P,r),s=t.update(e,"utf8","hex");return s+=t.final("hex"),{iv:r.toString("hex"),password:s}},L=function(e){console.log("Decryption...",e);var r=Buffer.from(e.iv,"hex"),t=Buffer.from(e.password,"hex"),s=R().createDecipheriv(B,P,r),n=s.update(t,null,"utf8");return n+=s.final("utf8")},C=function(){var e=t()(n().mark((function e(r,t){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b().hash(r,t));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=t()(n().mark((function e(r,t){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",b().compare(r,t));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();const K=E.define("User",{id:{type:T.DataTypes.UUID,primaryKey:!0,defaultValue:D.v4},email:{type:T.DataTypes.STRING,allowNull:!1,unique:!0,validate:{isEmail:!0}},username:{type:T.DataTypes.STRING,allowNull:!1,unique:!0},password:{type:T.DataTypes.STRING,allowNull:!1}},{timestamps:!0,hooks:{beforeCreate:(I=t()(n().mark((function e(r){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.password){e.next=5;break}return e.next=3,C(r.password,10);case 3:t=e.sent,r.password=t;case 5:case"end":return e.stop()}}),e)}))),function(){return I.apply(this,arguments)})},defaultScope:{attributes:{exclude:["password"]}},scopes:{withPassword:{attributes:{include:["password"]}},withoutPassword:{attributes:{exclude:["password"]}}}});var F,A=E.define("Login",{id:{type:T.DataTypes.UUID,primaryKey:!0,defaultValue:D.v4},name:{type:T.DataTypes.STRING,allowNull:!1},email:{type:T.DataTypes.STRING,allowNull:!1},username:{type:T.DataTypes.STRING,allowNull:!1},password:{type:T.DataTypes.STRING,allowNull:!1},iv:{type:T.DataTypes.STRING,allowNull:!0},website:{type:T.DataTypes.STRING},favorites:{type:T.DataTypes.BOOLEAN,defaultValue:!1}},{timestamps:!0,hooks:{beforeCreate:function(){var e=t()(n().mark((function e(r){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O(r.password);case 3:t=e.sent,r.password=t.password,r.iv=t.iv,e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),console.error("Error encrypting password:",e.t0),new Error("Failed to encrypt password");case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),beforeUpdate:(F=t()(n().mark((function e(r){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.changed("password")){e.next=13;break}return e.prev=1,e.next=4,O(r.password);case 4:t=e.sent,r.password=t.password,r.iv=t.iv,e.next=13;break;case 9:throw e.prev=9,e.t0=e.catch(1),console.error("Error encrypting password:",e.t0),new Error("Failed to encrypt password");case 13:case"end":return e.stop()}}),e,null,[[1,9]])}))),function(){return F.apply(this,arguments)})}});const V=A;const M=E.define("Note",{id:{type:T.DataTypes.UUID,primaryKey:!0,defaultValue:D.v4},name:{type:T.DataTypes.STRING,allowNull:!1},content:{type:T.DataTypes.STRING,allowNull:!1},favorites:{type:T.DataTypes.BOOLEAN,defaultValue:!1}},{timestamps:!0});const z=E.define("Folder",{id:{type:T.DataTypes.UUID,primaryKey:!0,defaultValue:D.v4},name:{type:T.DataTypes.STRING,allowNull:!1},description:{type:T.DataTypes.STRING,allowNull:!0}},{timestamps:!0});K.hasMany(V,{foreignKey:"user_id",as:"logins"}),K.hasMany(M,{foreignKey:"user_id",as:"notes"}),K.hasMany(z,{foreignKey:"user_id",as:"folders"}),z.hasMany(V,{foreignKey:"folder_id",as:"logins"}),z.hasMany(M,{foreignKey:"folder_id",as:"notes"}),V.belongsTo(K,{foreignKey:"user_id",as:"user"}),V.belongsTo(z,{foreignKey:"folder_id",as:"folder"}),M.belongsTo(K,{foreignKey:"user_id",as:"user"}),M.belongsTo(z,{foreignKey:"folder_id",as:"folder"});const W=function(){return N()((function e(){j()(this,e)}),null,[{key:"findUserByEmail",value:(s=t()(n().mark((function e(r){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.findOne({where:{email:r},attributes:["id","email","username","password"],include:[{model:V,as:"logins"},{model:M,as:"notes"},{model:z,as:"folders",include:[{model:M,as:"notes"},{model:V,as:"logins"}]}]});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(){return s.apply(this,arguments)})},{key:"createUser",value:(r=t()(n().mark((function e(r,t,s){var a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(s,10);case 2:return e.sent,e.next=5,K.create({username:r,email:t,password:s});case 5:return a=e.sent,e.abrupt("return",a);case 7:case"end":return e.stop()}}),e)}))),function(){return r.apply(this,arguments)})},{key:"findUserById",value:(e=t()(n().mark((function e(r){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,K.findOne({where:{id:r},include:[{model:V,as:"logins"},{model:M,as:"notes"},{model:z,as:"folders",include:[{model:M,as:"notes"},{model:V,as:"logins"}]}]});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})}]);var e,r,s}(),Y=require("express-async-handler");var H=e.n(Y);require("@babel/runtime/helpers/possibleConstructorReturn"),require("@babel/runtime/helpers/getPrototypeOf"),require("@babel/runtime/helpers/inherits"),require("@babel/runtime/helpers/wrapNativeSuper");var J=H()(function(){var e=t()(n().mark((function e(r,t){var s,a,u,o,i,c;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.body,a=s.username,u=s.email,o=s.password,e.next=3,K.findOne({where:{email:u}});case 3:if(!e.sent){e.next=6;break}return e.abrupt("return",t.status(400).json({success:!1,message:"User already registered"}));case 6:return e.next=8,W.createUser(a,u,o);case 8:return i=e.sent,c=x(i),t.cookie("access_token",c,{httpOnly:!0,secure:!0,sameSite:"Strict",maxAge:36e5,path:"/"}),e.abrupt("return",t.status(201).json({success:!0,message:"User successfully registered.",token:c}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Q=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W.findUserByEmail(r.body.email);case 2:if(s=e.sent){e.next=5;break}return e.abrupt("return",t.status(400).json({success:!1,message:"User not found"}));case 5:return e.next=7,G(r.body.password,s.password);case 7:if(e.sent){e.next=10;break}return e.abrupt("return",t.status(400).json({success:!1,message:"Invalid credentials."}));case 10:return a=x(s),t.cookie("access_token",a,{httpOnly:!0,secure:!0,sameSite:"Strict",maxAge:36e5,path:"/"}),e.abrupt("return",t.status(200).json({success:!0,message:"User logged in successfully.",token:a,user:{id:s.id,username:s.username,email:s.email,logins:s.logins,folders:s.folders,notes:s.notes}}));case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),X=H()(function(){var e=t()(n().mark((function e(r,t){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.clearCookie("access_token"),e.abrupt("return",t.status(200).json({success:!0,message:"User logged out successfully."}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Z=H()(function(){var e=t()(n().mark((function e(r,t,s){var a,u;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.user.id,e.prev=1,e.next=4,W.findUserById(a);case 4:if(u=e.sent){e.next=7;break}return e.abrupt("return",t.status(400).json({success:!1,message:"User details retrieved successfully."}));case 7:return e.abrupt("return",t.status(200).json({success:!0,message:"User details retrieved successfully.",user:{id:u.id,username:u.username,email:u.email,logins:u.logins,notes:u.notes,folders:u.folders}}));case 10:e.prev=10,e.t0=e.catch(1),s(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}()),$=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"body";return function(t,s,n){var a=t[r];console.log("Validating inputs...",a);var u=e.validate(a).error;if(u)return s.status(400).json({success:!1,message:"Validation Error",errors:u.details[0].message});n()}};const ee=require("joi");var re=e.n(ee),te=re().object({username:re().string().min(3).max(30).required().messages({"string.base":"Username should be a string","string.min":"Username must be at least 3 characters long","string.max":"Username can be up to 30 characters long","any.required":"Username is required"}),email:re().string().email().required().messages({"string.email":"Invalid email format","any.required":"Email is required"}),password:re().string().min(6).required().messages({"string.min":"Password must be at least 6 characters long","any.required":"Password is required"})}),se=re().object({email:re().string().email().required().messages({"string.email":"Invalid email format","any.required":"Email is required"}),password:re().string().min(6).required().messages({"string.min":"Password must be at least 6 characters long","any.required":"Password is required"})});i().config();var ne=H()(function(){var e=t()(n().mark((function e(r,t,s){var a,u,o;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(u=r.cookies.access_token||(null===(a=r.header("Authorization"))||void 0===a?void 0:a.replace("Bearer ",""))){e.next=3;break}return e.abrupt("return",t.status(400).json({success:!1,message:"No token found. Please log in."}));case 3:if(e.prev=3,o=h().verify(u,process.env.JWT_SECRET)){e.next=7;break}return e.abrupt("return",t.status(400).json({success:!1,message:"Invalid token."}));case 7:r.user=o,s(),e.next=14;break;case 11:return e.prev=11,e.t0=e.catch(3),e.abrupt("return",t.status(400).json({success:!1,message:"Invalid or expired token."}));case 14:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}()),ae=u().Router();ae.post("/register",$(te),J),ae.post("/login",$(se),Q),ae.delete("/logout",ne,X),ae.get("/me",ne,Z);const ue=ae;var oe=H()(function(){var e=t()(n().mark((function e(r,t){var s,a,u,o,i,c,l,d,p,f,m,v;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,a=r.body,u=a.folder_id,o=a.name,i=a.email,c=a.username,l=a.password,d=a.website,p=a.favorites,e.prev=2,e.next=5,K.findByPk(s);case 5:if(f=e.sent,!u){e.next=12;break}return e.next=9,z.findByPk(u);case 9:e.t0=e.sent,e.next=13;break;case 12:e.t0=null;case 13:if(m=e.t0,f){e.next=16;break}return e.abrupt("return",t.status(404).json({message:"User not found"}));case 16:return e.next=18,V.create({user_id:f.id,folder_id:m?m.id:null,name:o,email:i,username:c,password:l,iv:null,website:d,favorites:p});case 18:return v=e.sent,e.abrupt("return",t.status(201).json({success:!0,message:"New Login created successfully",login:v}));case 22:return e.prev=22,e.t1=e.catch(2),console.error("Error creating login:",e.t1),e.abrupt("return",t.status(500).json({message:"Error creating login"}));case 26:case"end":return e.stop()}}),e,null,[[2,22]])})));return function(){return e.apply(this,arguments)}}()),ie=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,V.findByPk(s);case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Login not found"}));case 6:return e.next=8,a.destroy();case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Login deleted successfully."}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),ce=H()(function(){var e=t()(n().mark((function e(r,t){var s;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,L({iv:r.body.iv,password:r.body.password});case 2:if(s=e.sent,console.log("PASSWORD DETAILS: ",r.body),console.log("DECRYPTED...",s),s){e.next=7;break}return e.abrupt("return",t.status(404).json({error:"Password decryption failed."}));case 7:return e.abrupt("return",t.status(200).json({success:!0,message:"Password successfully decrypted.",password:s}));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),le=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,V.findByPk(s);case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Login not found"}));case 6:return e.next=8,a.update(r.body);case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Login updated successfully.",login:a}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),de=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,V.findOne({where:{id:s}});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Login not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Login retrieved successfully.",login:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),pe=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,e.next=3,V.findAll({where:{user_id:s}});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Login not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Login retrieved successfully.",logins:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),fe=(re().object({name:re().string().min(3).max(50).required().messages({"string.base":"Name should be a string","any.empty":"Name is required","string.min":"Name should have a minimum length of 3 characters","string.max":"Name can be at most 50 characters long"}),username:re().string().min(3).max(30).required().messages({"string.base":"Username should be a string","string.min":"Username must be at least 3 characters long","string.max":"Username can be up to 30 characters long","any.required":"Username is required"}),email:re().string().email().required().messages({"string.email":"Invalid email format","any.required":"Email is required"}),password:re().string().min(6).required().messages({"string.min":"Password must be at least 6 characters long","any.required":"Password is required"}),folder_id:re().required().messages({"any.required":"Id is required"})}),u().Router());fe.post("/",ne,oe),fe.get("/:id",ne,de),fe.delete("/:id",ne,ie),fe.get("/",ne,pe),fe.put("/:id",ne,le),fe.post("/decryptpassword",ne,ce);const me=fe;var ve=H()(function(){var e=t()(n().mark((function e(r,t){var s,a,u,o,i,c;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,a=r.body,u=a.name,o=a.description,e.prev=2,e.next=5,K.findByPk(s);case 5:if(i=e.sent){e.next=8;break}return e.abrupt("return",t.status(404).json({message:"User not found"}));case 8:return e.next=10,z.create({user_id:i.id,name:u,description:o});case 10:return c=e.sent,e.abrupt("return",t.status(201).json({success:!0,message:"New Folder created successfully",folder:c}));case 14:return e.prev=14,e.t0=e.catch(2),console.error("Error creating folder:",e.t0),e.abrupt("return",t.status(500).json({message:"Error creating folder"}));case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(){return e.apply(this,arguments)}}()),ye=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,z.findByPk(s);case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Folder not found"}));case 6:return e.next=8,a.destroy();case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Folder deleted successfully."}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),ge=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,z.findOne({where:{id:s},include:["logins"]});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Folder not found"}));case 6:return e.next=8,a.update(r.body);case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Folder updated successfully.",folder:a}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),be=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,z.findOne({where:{id:s},include:["logins"]});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Folder not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Folder retrieved successfully.",folder:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),we=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,e.next=3,z.findAll({where:{user_id:s},include:["notes","logins"]});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Folder not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Folder retrieved successfully.",folders:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),he=u().Router();he.post("/",ne,ve),he.get("/:id",ne,be),he.get("/",ne,we),he.delete("/:id",ne,ye),he.put("/:id",ne,ge);const xe=he;var ke=H()(function(){var e=t()(n().mark((function e(r,t){var s,a,u,o,i,c,l,d,p;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,a=r.body,u=a.folder_id,o=a.name,i=a.content,c=a.favorites,e.prev=2,e.next=5,K.findByPk(s);case 5:if(l=e.sent,!u){e.next=12;break}return e.next=9,z.findByPk(u);case 9:e.t0=e.sent,e.next=13;break;case 12:e.t0=null;case 13:if(d=e.t0,l){e.next=16;break}return e.abrupt("return",t.status(404).json({message:"User not found"}));case 16:return e.next=18,M.create({user_id:l.id,folder_id:d?d.id:null,name:o,content:i,favorites:c});case 18:return p=e.sent,e.abrupt("return",t.status(201).json({success:!0,message:"New Note created successfully",note:p}));case 22:return e.prev=22,e.t1=e.catch(2),console.error("Error creating note:",e.t1),e.abrupt("return",t.status(500).json({message:"Error creating note"}));case 26:case"end":return e.stop()}}),e,null,[[2,22]])})));return function(){return e.apply(this,arguments)}}()),je=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,M.findByPk(s);case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Note not found"}));case 6:return e.next=8,a.destroy();case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Note deleted successfully."}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),qe=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,M.findByPk(s);case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Note not found"}));case 6:return e.next=8,a.update(r.body);case 8:return e.abrupt("return",t.status(200).json({success:!0,message:"Note updated successfully.",note:a}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Ne=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.params.id,e.next=3,M.findOne({where:{id:s}});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Note not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Note retrieved successfully.",note:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Te=H()(function(){var e=t()(n().mark((function e(r,t){var s,a;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.user.id,e.next=3,M.findAll({where:{user_id:s}});case 3:if(a=e.sent){e.next=6;break}return e.abrupt("return",t.status(404).json({error:"Note not found"}));case 6:return e.abrupt("return",t.status(200).json({success:!0,message:"Note retrieved successfully.",notes:a}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),Ue=u().Router();Ue.post("/",ne,ke),Ue.get("/:id",ne,Ne),Ue.get("/",ne,Te),Ue.delete("/:id",ne,je),Ue.put("/:id",ne,qe);const _e=Ue;i().config();var Ee=u()();Ee.use(u().json()),Ee.use(u().urlencoded({extended:!0})),Ee.use(p().urlencoded({extended:!0})),Ee.use(p().json()),Ee.use(l()()),Ee.use(m()({origin:process.env.FRONTEND_CLIENT_URL,credentials:!0})),Ee.use(y()()),Ee.use("/api/v2/auths",ue),Ee.use("/api/v2/logins",me),Ee.use("/api/v2/folders",xe),Ee.use("/api/v2/notes",_e),Ee.use("*",(function(e,r,t){console.error(e.stack),t.status(500).send(e.message)}));const De=Ee;i().config();var Se=process.env.PORT||5555;(function(){var e=t()(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,E.sync({force:!0});case 3:console.log("Database connected successfully"),De.listen(Se,(function(){console.log("Server running on port ".concat(Se))})),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("Unable to connect to the database:",e.t0),process.exit(1);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()(),module.exports={}})();