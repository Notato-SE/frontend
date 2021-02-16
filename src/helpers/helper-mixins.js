export default {
  data: () => ({
    socials: ["facebook", "google", "twitter"],
    connections: {},

    linked: null,
  }),

  created() {
    // this.socials.map((social) => {
    //   this.connections[social] = true
    // })
  },

  computed: {
    googleClientId() {
      return process.env.GOOGLE_ID;
    },
    facebookClientId() {
      return process.env.FACEBOOK_ID;
    },
  },
  methods: {
    // axios(endpoint, method) {},
  },
};
