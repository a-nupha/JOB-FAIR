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
                                    <strong> ช่องทางการรับผล </strong>
                                </v-flex>

                            </v-layout>

                            <v-layout mt-5 align-center justify-center>

                                <v-col md="4" xs="12">
                                    <v-flex>
                                        <v-flex mt-2 class="title--text">
                                            สามารถเลือกรับผลได้มากกว่า 1 ช่องทาง
                                        </v-flex>
                                         <template v-for="item in chanelNotificationItems">
                                            <v-container v-bind:key="item.chanelNotificationNameTh">
                                            <v-checkbox
                                            @click="test(item)"
                                            :label="`${item.chanelNotificationNameTh}`"
                                            ></v-checkbox>
                                            </v-container>
                                        </template>
                                         
                                        <!-- <v-radio-group style="margin-top:0px;" v-model="chanelNotification">
                                            <template v-for="item in chanelNotificationItems">
                                                <v-radio :value="item" v-bind:key="item.chanelNotificationNameTh">
                                                    <template v-slot:label>
                                                        <div class="title--text">{{item.chanelNotificationNameTh}} <br>
                                                            <div>({{item.chanelNotificationNameEg}}) <br>
                                                            </div>
                                                            {{item.chanelNotificationStatus == true ? 'open' : 'colse'}}
                                                        </div>
                                                    </template>
                                                </v-radio>
                                            </template>
                                        </v-radio-group> -->
                                       
                                    </v-flex>
                                </v-col>
                             
                            </v-layout>

                        </v-form>
                        <v-layout mt-5 align-center justify-center>
                            <v-flex ma-2 mt-5 mb-2 md3 xs12>
                                <v-btn @click="back()" block depressed elevation="6" rounded x-large color="primary">
                                    ย้อนกลับ
                                </v-btn>
                            </v-flex>
                            <v-flex ma-2 mt-5 mb-2 md3 xs12>
                                <v-btn @click="submit()" block depressed elevation="6" rounded x-large color="primary">
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
        chanelNotification: '',
        chanelNotificationItems: [{
            chanelNotificationNameTh: 'LINE',
            chanelNotificationNameEg: 'Thong-lo Station',
            chanelNotificationStatus: true,
        }, 
        {
            chanelNotificationNameTh: 'EMAIL',
            chanelNotificationNameEg: 'National Stadium Station',
            chanelNotificationStatus: false,
        }, 
        {
            chanelNotificationNameTh: 'EMS',
            chanelNotificationNameEg: 'Nana Station',
            chanelNotificationStatus: false,
        }, 
        ],
    }),

    mounted() {

    },
    created() {

    },

    watch: {

    },

    methods: {
        back() {
            this.z = 'location';
        },
        submit(){
            this.z = 'booking';
            console.log('test')
        },
        test(a){
            console.log('a', a);
        }

    },

}
</script>
