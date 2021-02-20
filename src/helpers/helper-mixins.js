import axios from "axios";
import EventBus from "@/helpers/event-bus";

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
    getHeader() {
      return {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://calculator_api.blah",
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYTM2NWJlNWFkYjQ1M2JlMmYzZDEzMWEzOTk3Y2Q2ODczNDkwMDEzZGYwMzljMjhhMTgxYTkyNzFiMTU4MzE2OGM0Yjk0ZmQxOTlmYTEwYWMiLCJpYXQiOiIxNjEzNjYyMzA3LjQwNzAwNyIsIm5iZiI6IjE2MTM2NjIzMDcuNDA3MDEwIiwiZXhwIjoiMTYxMzY4MzkwNy4yNjcwMTkiLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.tEwcRLTBRw_bZx1UQadZaKSzPqIxcFVTrB8-cjXzMCy6o0lt-4UPmxcrkbuK4IIOc4yzdyuZAQGfgv1V28LFrjqCtHKFOEx2sR2brmUWPnEocbeMwV4n9kJGYEi6Vm3ustqq2noXz5TeFNUMi0TgR2k4dhySm4o1bOLLCJkiaZNNJwCTvVR4K7v0ImkbcC-LhISOqKa2H6H_neUsYrhppL02RS2-_K62eJC5R9_iYxK1Aj7Jww-Uzr1c0lsnYebkn51lUC0zKn1Ta9Oo1iLfFDcgJxlyYel1hs-1V9gA2AgokcSlW1s-00UAweiNFJqiLEswVYgnmCQtnSTcYHO1pwiddaQ_ccvUWFtRm3QTCCb8vAB1ljA-aktAoXwpZzz54rtP5iDKhVvO5m2w_bXBm62gkllFdJHyauv1MJn5KByTTeqWUyowwhUGcQb0y2xFfhXCVJwpwR1MZGbAN6-mLCxyg5SJx0JdUQLZWujaQ9EhsxNUzYC-vwNf6Uq3R5GObfPD2jA_EMexjl3msfWniHl1rJiFq1o3qqenMFUOk42o0LAa5NxQJJ5_yJgX0ZCOh5hdbmlq0nQcmGxc5Wd6gh_YZeQyZ-GNvF4P5-xtagbAEmaPAFFfusTamtcRVbrwadGxgVQppcwlOYOXkjzcFnznDQB6V5AEzncUpV4kcSQ",
      };
    },
    async getAxios(endpoint, showAlert = false) {
      let message = "";
      const res = await axios
        .get(endpoint)
        .catch((error) => (message = error.response?.data?.message));

      if (message) {
        EventBus.$emit("SET_ALERT", {
          type: "error",
          show: true,
          message,
        });
      } else if (showAlert) {
        EventBus.$emit("SET_ALERT", {
          type: "success",
          show: true,
          message: res?.data?.message,
        });
      }
      return res?.data?.data;
    },
    async postAxios(endpoint, data, method = "post", showAlert = true) {
      let message = "";
      const res = await axios[method](endpoint, data).catch(
        (error) => (message = error.response?.data?.message)
      );

      if (message) {
        EventBus.$emit("SET_ALERT", {
          type: "error",
          show: true,
          message,
        });
      } else if (showAlert) {
        EventBus.$emit("SET_ALERT", {
          type: "success",
          show: true,
          message: res?.data?.message,
        });
      }

      return res?.data?.data;
      // try {
      // } catch (error) {}
    },
  },
};
