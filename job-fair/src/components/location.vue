<template>
<v-content>
    <v-container>
        <v-layout>
            <v-flex class="grey lighten-4">
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
                                <!-- <v-container fluid > -->
                                <v-col md="4" xs="12">
                                    <v-flex>
                                        <v-flex mt-2 class="title--text">
                                            สถานนีรถไฟฟ้า บีทีเอส / BTS Station
                                        </v-flex>
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
                                        <!-- </v-col>
                                        </v-row> -->
                                        <!-- <ThailandAutoComplete v-model="district" type="district" @select="select" label="ตำบล" size="medium" placeholder="ตำบล..."/>
                                        <ThailandAutoComplete v-model="amphoe" type="amphoe" @select="select" label="อำเภอ" color="#42b883" placeholder="อำเภอ..."/>
                                        <ThailandAutoComplete v-model="province" type="province" @select="select" label="จังหวัด" size="medium" color="#35495e" placeholder="จังหวัด..."/> -->

                                    </v-flex>
                                </v-col>
                                <!-- </v-container> -->
                            </v-layout>

                        </v-form>
                        <v-layout mt-5 align-center justify-center>
                            <v-flex ma-2 mt-5 mb-2 md3 xs12>
                                <v-btn @click="back()" block depressed elevation="6" rounded x-large color="primary">
                                    ย้อนกลับ
                                </v-btn>
                            </v-flex>
                            <v-flex ma-2 mt-5 mb-2 md3 xs12>
                                <v-btn @click="sumbit()" block depressed elevation="6" rounded x-large color="primary">
                                    เลือก
                                </v-btn>
                            </v-flex>
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
