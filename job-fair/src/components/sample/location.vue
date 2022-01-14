<template>
<v-content>
    <v-container>
        <v-layout justify-center>
            <v-flex  md4 class="grey lighten-4 rounded-xl">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class="
                                d-flex
                                flex-column
                                align-center
                                ">
                                <v-flex mt-5>
                                    <v-img contain lazy-src="https://www.img.in.th/images/685712519a2fdd56cfd71e60cbc5bdc1.png" max-height="150" max-width="250" src="https://www.img.in.th/images/685712519a2fdd56cfd71e60cbc5bdc1.png"></v-img>
                                </v-flex>
                            </div>
                            <v-layout style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong> สถานที่ตรวจจะรับบริการ </strong>
                                </v-flex>

                            </v-layout>

                            <v-layout mt-5 align-center justify-center>
                                <v-col md="10" xs="12">
                                        <v-flex  mt-2 class="title--text d-flex align-center justify-center pa-1 mx-auto">
                                            สถานนีรถไฟฟ้า บีทีเอส / BTS Station
                                        </v-flex>
                                    <v-flex class="d-flex align-center justify-center pa-1 mx-auto">
                                        <v-radio-group style="margin-top:0px;" v-model="Station">
                                            <template v-for="item in stationItems">
                                                <v-radio :value="item" v-bind:key="item.stationNameTh">
                                                    <template v-slot:label>
                                                        <div class="title--text">{{item.stationNameTh}} <br>
                                                            <div>({{item.stationNameEg}}) <br>
                                                            </div>
                                                            {{item.stationStatus == true ? 'open' : 'colse'}}
                                                        </div>
                                                    </template>
                                                </v-radio>
                                            </template>
                                        </v-radio-group>
                                    </v-flex>
                                </v-col>
                            </v-layout>

                        </v-form>
                        <v-layout mb-12 mt-5 align-center justify-center>
                        <v-layout mb-12 mt-5 align-center justify-center>
                            <v-flex ma-2 mt-7 mb-2 md4 xs6>
                                <v-btn @click="back()" block depressed elevation="6" rounded x-large color="primary">
                                    ย้อนกลับ
                                </v-btn>
                            </v-flex>
                            <v-flex ma-2 mt-7 mb-2 md4 xs6>
                                <v-btn @click="sumbit()" block depressed elevation="6" rounded x-large color="primary">
                                    เลือก
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        </v-layout>


                    </v-card>
                </v-container>
            </v-flex>
        </v-layout>

    </v-container>
</v-content>
</template>

<script>
// import dateGlobal from '../components/GlobalDate.vue'
import {
    mapState
} from "vuex";
import {
    sync
} from "vuex-pathify";

export default {
    name: "applicationFrom",
    components: {

    },

    computed: {
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
    },

    data: () => ({
        Station: '',
        stationItems: [{
            stationNameTh: 'สถานนีทองหล่อ',
            stationNameEg: 'Thong-lo Station',
            stationStatus: true,
        }, {
            stationNameTh: 'สถานนีสถานกีฬาแห่งชาติ',
            stationNameEg: 'National Stadium Station',
            stationStatus: false,
        }, {
            stationNameTh: 'สถานนีนานา',
            stationNameEg: 'Nana Station',
            stationStatus: false,
        }, {
            stationNameTh: 'สถานนีสะพานควาย',
            stationNameEg: 'Saphan-kwai Station',
            stationStatus: true,
        }],
    }),

    mounted() {

    },
    created() {

    },

    watch: {

    },

    methods: {
        back() {
            this.z = 'productPackage';
        },
        sumbit(){
            this.z = 'chanelNotification';
        }

    },

}
</script>
