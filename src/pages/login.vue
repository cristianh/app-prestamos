<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <img class="avatar-img" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar">
    <f7-login-screen-title>Bienvenido {{userGooglename}}</f7-login-screen-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
      <f7-block>
        <a-alert v-if="error" :message="error" type="error" />
      </f7-block>
    </f7-list>
    <f7-list >
       <f7-block>
         <f7-list >
               <f7-list-item
              checkbox
              :checked=recordarme
              name="my-checkbox"
              value="Books"
              title="Recordarme."
              @change="getCheck"
            ></f7-list-item>
             </f7-list>
     </f7-block>
     
      <f7-list-button @click="signIn">Ingresar</f7-list-button>
       <!-- <f7-list-button href="/registro/">Registrame</f7-list-button> -->
      <!-- <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer> -->
    </f7-list>
  
 
     <div style="dislay:inlin-block">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
       <path fill="#0099ff" fill-opacity="1" d="M0,320L48,272C96,224,192,128,288,101.3C384,75,480,117,576,149.3C672,181,768,203,864,202.7C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    </div>
      
    
  </f7-page>
</template>

<script>
import firebase from 'firebase'
  export default {
    data() {
      return {
        recordarme:false,
        username: '',
        password: '',
        userGooglename:'Invitado',
        error:'',
        info:{
          name:'Cristian',
          airline:'hrnandz'
        }
      };
    },
    created(){
      //  axios.get('https://app-prestamo.herokuapp.com/Todo2').then((response)=>{
      //           console.log("hroku",response);
      //       })

         
    },
    methods: {
      signInFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(user);
});
      },
      signInGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
       
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            this.userGooglename=user.displayName;
            this.$f7router.navigate('/home/', {
            props: {
                usuario: user.displayName,
                photo:user.photoURL,
                lastActivity:user.metadata.lastSignInTime
            }
            })
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
            });
            
        // const self = this;
        // const app = self.$f7;
        // const router = self.$f7router;
        // app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
        //   router.back();
        // });
      },
      signIn() {
        // const self = this;
        // const app = self.$f7;
        // const router = self.$f7router;
        // app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
        //   router.back();
        // });
            firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((response)=> {
            console.log(response);
            const username = response.user;
            const id= response.user.displayName.split("-");
            localStorage.setItem("uid", id[1]);
            localStorage.setItem("email", response.user.email);
            localStorage.setItem("name", id[0]);
            const self = this;
            const app = self.$f7;
            const router = self.$f7router;
            this.$f7router.navigate('/home/', {
            props: {
                usuario: username.displayName
            }
            })
            // ...
            }).catch((error)=> {
            // Handle Errors here.
             
            var errorCode = error.code;
            var errorMessage = error.message;
            this.error=errorMessage;
            console.log(errorMessage);
            
            });
      },
      getCheck($event){
       console.log($event);
       this.recordarme=!this.recordarme;
       if(this.recordarme){
         // Guardar datos al almacenamiento local actual
          localStorage.setItem("username", this.username);
          localStorage.setItem("password", this.password);
       }
       
      },
      GuardarUsuario(){
        // axios.post('https://app-prestamo.herokuapp.com/Todo2',this.info).then((response)=>{
        //         console.log(response);
        //     })
      }
    },
  };
</script>

<style lang="less">
.avatar-img {
  margin:9% 28% 3% 29%;
  width:125px;
  height:125px;
  border-radius: 50%;
}
</style>