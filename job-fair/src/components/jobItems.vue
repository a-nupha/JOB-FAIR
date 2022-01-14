<template>
<v-content>
    <v-container>
        <v-layout justify-center>
            <v-flex md4 class="grey lighten-4 rounded-xl">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class="
                      d-flex
                      flex-column
                      align-center
                      rounded-xl
                    ">
                                <v-flex mt-5>

                                </v-flex>
                            </div>
                            <v-layout mt-5 align-content-center style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong>
                                        พบ xxxx ตำแหน่ง
                                    </strong>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
</template>

<script>
import {
    mapState
} from "vuex";
import {
    sync
} from "vuex-pathify";

export default {
    name: 'jobItems',
    components: {

    },
    data: () => ({

    }),
    watch: {

    },
    computed: {
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
    },
    mounted() {},
    created() {},
    methods: {

    },

}
</script>

<style scoped>
#bottom {
    height: 250 px;
    width: 100%;
    background: linear-gradient(141deg, #d39656 0%, #d39656 51%, #d39656 75%);
    color: white;
    opacity: 0.95;
}
</style>
