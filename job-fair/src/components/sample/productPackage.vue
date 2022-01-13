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
                            <v-layout align-content-center style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong>
                                        ประเภทการตรวจ <br>
                                        ประเภทการตรวจที่ประสงค์จะรับบริการ
                                    </strong>
                                </v-flex>
                            </v-layout>
                            <v-layout class="px-0" fluid>
                                <v-flex md10 class="d-flex align-center justify-center pa-4 mx-auto">
                                    <v-radio-group v-model="selectProduct">
                                        <template v-for="item in filterResourceItems">
                                            <v-radio :value="item" v-bind:key="item.id">
                                                <template v-slot:label>
                                                    <div>{{item.productname}} <br>
                                                        <div v-if="item.productDesc != ''">
                                                            <strong class="success--text">{{item.productDesc}}</strong> <br>
                                                        </div>
                                                        <div v-if="item.productPice != ''">
                                                            <strong class="primary--text">{{item.productPice}} บาท</strong>
                                                        </div>
                                                    </div>
                                                </template>
                                            </v-radio>
                                        </template>
                                    </v-radio-group>
                                </v-flex>
                            </v-layout>
                            <v-layout mt-9 mb-12 align-center justify-center>
                                <v-layout mb-12 align-center justify-center>
                                    <v-layout mb-12 align-center justify-center>
                                        <v-layout mb-12 align-center justify-center>
                                            <v-flex ma-2 mt-7 mb-2 md4 xs6>
                                                <v-btn @click="back()" block depressed elevation="6" rounded x-large color="primary">
                                                    ย้อนกลับ
                                                </v-btn>
                                            </v-flex>
                                            <v-flex ma-2 mt-7 mb-2 md4 xs6>
                                                <v-btn block depressed elevation="6" @click="submit()" rounded x-large color="primary">
                                                    เลือก
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-layout>

                                </v-layout>
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
import axios from 'axios';

export default {
    name: 'productPackage',
    data: () => ({
        selectProduct: [],
        filterResourceItems: [{
                id: 1,
                productname: "Speedy RT-PCR",
                productPice: "900",
                productDesc: "(ทราบผลภายใน 3 ชม.)"
            },
            {
                id: 2,
                productname: "Fit-To-Fly",
                productPice: "400",
                productDesc: "(ผลตรวจ RT-PCR , ใบรับรองแพทย์)"
            },
            {
                id: 3,
                productname: "RT-PCR",
                productPice: "500",
                productDesc: ""
            },
            {
                id: 4,
                productname: "ATK",
                productPice: "300",
                productDesc: ""
            },
        ]

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
    created() {
        this.testGet()
    },
    methods: {
        async testGet() {
            await axios.get('https://reqres.in/api/products/3')
                .then((response) => {
                    console.log('response', response)
                })
                .catch((error) => {
                    console.log('error', error)
                })
        },
        submit() {
            this.z = 'location';
        },
        back(){
            this.z = 'applicationFrom';
        }
    },

}
</script>
