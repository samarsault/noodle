<template>
  <main>
    <aside class="flex-centre">
      <h1>Welcome</h1>
      <p>
        Please complete the following info to complete your sign up. It is
        required that you input the correct information for hassle-free
        registration.
      </p>
    </aside>
    <section>
      <form method="POST" @submit="auth">
        <p
          v-if="error.show"
          style="
            background-color: hsla(0, 100%, 50%, 0.2);
            color: hsl(0, 50%, 35%);
            padding: 10px 20px;
            border-radius: 4px;
          "
        >
          {{ error.message }}
        </p>

        <div v-if="!login">
          <label for="name">Name</label>
          <input
            name="name"
            v-model="name"
            type="text"
            placeholder="Full name, ex: John Doe"
            required
          />
        </div>
        <label for="email">Email</label>
        <input
          name="email"
          v-model="email"
          type="email"
          placeholder="johndoe@example.com"
          required
        />
        <label for="phone">Password</label>
        <input
          name="pass"
          v-model="pass"
          type="password"
          placeholder="•••••••"
          required
        />
        <p v-if="login">New user? <a href="#" @click="toggle">Sign up.</a></p>
        <p v-else>Existing user? <a href="#" @click="toggle">Log in.</a></p>
        <button class="primary icon-button">
          <span class="icon-right">{{ login ? "Login" : "Sign up" }}</span
          ><Go :size="28" />
        </button>
      </form>
      <!--
      <a href="http://localhost:3000/auth">
        <button>Google Log in</button>
      </a>
      -->
    </section>
  </main>
</template>

<script>
import axios from "axios";
import Go from "vue-material-design-icons/AccountArrowRight";

export default {
  components: {
    Go,
  },
  data() {
    return {
      name: "",
      email: "",
      pass: "",
      error: {
        show: false,
        message: "",
      },
      login: true,
    };
  },
  methods: {
    toggle() {
      this.login = !this.login;
    },
    showError(msg) {
      this.error = {
        show: true,
        message: msg,
      };
    },
    // oAuth() {
    //   window.onAuth = (token) => {
    //     console.log(token);
    //     localStorage.setItem("token", token);
    //   };
    //   window.addEventListener(
    //     "message",
    //     (event) => window.onAuth(event),
    //     false
    //   );

    //   window.open(
    //     "http://localhost:3000/auth",
    //     "Google Auth",
    //     "toolbar=no, menubar=no, width=480, height=640"
    //   );
    // },
    async logIn() {
      const email = this.email;
      const password = this.pass;

      if (email && password) {
        try {
          const { data } = await axios.post("/auth/login", {
            email,
            password,
          });
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push({
              path: "/",
            });
          } else {
            throw new Error(data.message);
          }
        } catch (err) {
          // TODO: Update
          this.showError("Invalid email or password");
        }
      }
    },
    async signUp() {
      const email = this.email;
      const name = this.name;
      const password = this.pass;

      if (password.length < 8) {
        this.showError("Password should be atleast 8 characters");
        return;
      }

      if (name && email && password) {
        const { data } = await axios.post("/auth/signup", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          this.$router.push({
            path: "/",
          });
        } else {
          this.showError(data.message);
        }
      }
    },
    auth(e) {
      e.preventDefault();
      if (this.login) this.logIn();
      else this.signUp();
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 540px;
  padding: 20px;
  margin: auto;
  margin-top: 60px;
  @media screen and (max-width: 640px) {
    margin-top: 20px;
    padding: 40px 20px;
  }
  input {
    width: 100%;
  }
}
main {
  display: flex;
  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
}
section {
  max-width: 600px;
  flex-basis: 40%;
  @media screen and (min-width: 640px) and (max-width: 880px) {
    flex-basis: 50%;
  }
}
@media screen and (max-width: 640px) {
  section,
  aside {
    flex-basis: 100%;
  }
}
aside {
  flex-basis: 60%;
  @media screen and (min-width: 640px) and (max-width: 880px) {
    flex-basis: 50%;
  }

  @media screen and (max-width: 640px) {
    min-height: 480px;
  }
  background-image: url("/images/welcome.svg");
  background-size: cover;
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  min-height: 600px;
  h1 {
    margin: 0;
    padding-top: 10px;
  }
  p {
    max-width: 400px;
    text-align: center;
    margin-bottom: 80px;
  }
}
.flex-centre {
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  margin-top: 20px;
}
</style>
