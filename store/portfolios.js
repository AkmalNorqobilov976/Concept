export const state = () => ({
    portfolios: [],
    portfolio: null,
    status: "",
    message: "",
    error: false
});

export const mutations = {
    PORTFOLIO_REQUEST(state) {
        state.status = "...loading",
            state.message = "";
        state.error = false
    },
    PORTFOLIOS_SUCCESS(state, portfolios) {
        state.portfolios = portfolios;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    PORTFOLIO_FAILURE(state, error) {
        state.status = "";
        state.message = "Muvaffaqiyatsiz yakunlandi!!!"
        state.error = true;

    },
    DISABLE_ERROR(state) {
        state.error = false;
        state.message = "";
    },

    PORTFOLIO_SUCCESS(state, portfolio) {
        state.portfolio = portfolio;
        state.status = "";
        state.message = "Muvaffaqiyatli yakunlandi!!!"
        state.error = false;
    },
    CLEAR_ONE_ORDER(state) {
        state.portfolio = null;
    }
};

export const actions = {

    GET_ONE({ commit }, id) {
        commit('PORTFOLIO_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/portfolio/one/${id}`)
                .then(res => {
                    commit('PORTFOLIO_SUCCESS');
                    resolve(true)
                })
                .catch(err => {
                    commit('PORTFOLIO_FAILURE');
                    reject(false);
                })
        })
    },

    GET_ALL({ commit }) {
        commit('PORTFOLIO_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$get('/portfolio/all')
                .then(res => {
                    commit('PORTFOLIOS_SUCCESS', res.data);
                    resolve(true)
                })
                .catch(err => {
                    commit('PORTFOLIO_FAILURE');
                    reject(false);
                })
        })
    },

    CREATE_ONE({ commit, dispatch }, data) {
        console.log(data);
        commit('PORTFOLIO_REQUEST');
        return new Promise((resolve, reject) => {
            this.$axios.$post('/portfolio/add', data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    commit('PORTFOLIO_FAILURE');
                    reject(false);
                });
        });
    },

    UPDATE_ONE({ commit, dispatch }, data) {
        commit('PORTFOLIO_REQUEST');
        console.log(data, "update uchun");
        return new Promise((resolve, reject) => {
            this.$axios.$put(`/portfolio/update/${data._id}`, data)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true)
                })
                .catch(err => {
                    // console.log(err);
                    commit('PORTFOLIO_FAILURE');
                    reject(false);
                });
        });
    },

    DELETE_ONE({ commit, dispatch }, id) {
        commit('PORTFOLIO_REQUEST');
        console.log(id, 'mening idim');
        return new Promise((resolve, reject) => {
            this.$axios.$delete(`/portfolio/delete/${id}`)
                .then(res => {
                    dispatch('GET_ALL');
                    resolve(true);
                })
                .catch(err => {
                    commit('PORTFOLIO_FAILURE');
                    reject(false);
                });
        });
    }

}
