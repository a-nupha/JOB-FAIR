<template>
<v-content>
    <v-container>
        <v-layout justify-center>
            <v-flex  md4 class="grey lighten-4 rounded-xl">
                <v-container>
                    <v-card class="rounded-xl" flat>
                        <v-form>
                            <div class=" d-flex flex-column align-center">
                            </div>
                            <v-layout style="color: #072a40;">
                                <v-flex class="d-flex align-center justify-center pa-4 mx-auto">
                                    <strong>
                                        ลงทะเบียนข้อมูลผู้สมัครับงาน
                                    </strong>
                                </v-flex>
                            </v-layout>

                            <v-layout mt-5 align-center justify-center>
                                <!-- <v-container fluid > -->
                                <v-col md="10" xs="12">
                                    <v-flex>
                                        <v-text-field label="id" placeholder="กรุณากรอกรหัส" outlined dense  :counter="50" :maxlength="50" v-model="userName"></v-text-field>
                                        <v-text-field label="password" placeholder="กรุณากรอกรหัสผ่าน" outlined dense  :counter="50" :maxlength="50" v-model="passWord"></v-text-field>

                                        <v-text-field label="ชื่อ" placeholder="กรุณากรอกชื่อ" outlined dense :rules="rulesFirstName" :counter="50" :maxlength="50" v-model="firstName"></v-text-field>
                                        <v-text-field label="นามสกุล" placeholder="กรุณากรอกนามสกุล" outlined dense :counter="50" :rules="rulesLastName" :maxlength="50" v-model="lastName"></v-text-field>
                                        <v-text-field label="เลขประจำตัวประชาชน" placeholder="กรุณากรอกเลขประจำตัวประชาชน" v-mask="'#-####-#####-##-#'" outlined dense :maxlength="17" :rules="rulesPid" v-model="pid"></v-text-field>
                                            <v-flex md12>
                                                <div>
                                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="birthDay" locale="th" :role="rulesBirthDay" :label="lableBirthDay" readonly outlined dense v-bind="attrs" v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker locale="th" v-model="birthDay" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
                                                    </v-menu>
                                                </div>
                                            </v-flex>
                                        

                                        <v-flex md12>
                                            <v-text-field label="เบอร์โทรศัพท์" placeholder="กรุณากรอกเบอร์โทรศัพท์" outlined dense :rules="rulesTel" :counter="20" :maxlength="20" v-model="mobile"></v-text-field>
                                        </v-flex>
                                        <v-flex md12>
                                            <v-text-field label="อายุ"  outlined dense :rules="rulesTel" :counter="2" :maxlength="2" v-model="age"></v-text-field>
                                        </v-flex>
                                        <v-layout>
                                        <v-flex md5 xs5 lg5>
                                            <v-text-field label="บ้านเลขที่"  outlined dense :rules="rulesAdress1" :counter="50" :maxlength="50" v-model="Adress1"></v-text-field>
                                        </v-flex>

                                        <v-flex md5 xs5 lg5>
                                            <v-text-field label="ซอย/ถนน"  outlined dense :rules="rulesAdress2" :counter="50" :maxlength="50" v-model="Adress2"></v-text-field>
                                        </v-flex>
                                        </v-layout>

                                        <v-flex md12>
                                            <ThailandAutoComplete v-model="zipcode" type="zipcode" @select="select" :placeholder="placeholderZipcode" />
                                        </v-flex>

                                        <v-flex md12 style="color: #0277bd;" class="d-flex align-left justify-left pa-1 mx-auto">
                                            <div v-if="zipcode">
                                                ที่อยู่ :{{province.indexOf('กรุงเทพมหานคร') == 0 ? 'แขวง' : 'ตำบล:'}} {{district}} {{province.indexOf('กรุงเทพมหานคร') == 0 ? 'เขต:' : 'อำเภอ:'}} {{amphoe}} {{province.indexOf('กรุงเทพมหานคร') == 0 ? '' : 'จังหวัด:'}} {{province}}
                                            </div>
                                        </v-flex>

                                        <v-flex md12>
                                            <v-text-field :label="lableEmail" :placeholder="placeholderEmail" outlined dense :rules="rulesEmail" :counter="50" :maxlength="50" v-model="Email"></v-text-field>
                                        </v-flex>
                                         <v-flex md12>
                                             <v-autocomplete
                                                v-model="education"
                                                :items="educationalItems"
                                                outlined
                                                dense
                                                
                                                
                                                label="วัฒิการศึกษา"
                                                
                                            ></v-autocomplete>
                                        </v-flex>
                                        <v-flex md12>
                                             <v-autocomplete
                                                v-model="values"
                                                :items="items"
                                                outlined
                                                dense
                                                chips
                                                small-chips
                                                label="ลักษณะงาน"
                                                multiple
                                            ></v-autocomplete>
                                        </v-flex>
                                        ประเภทงานที่ต้องการ	
                                        <v-flex md12>
                                            <template>
                                            <v-container fluid>
                                                <!-- <p>{{ selected }}</p> -->
                                                <v-checkbox
                                                v-model="selected"
                                                label="part-time"
                                                value="part-time"
                                                ></v-checkbox>
                                                <v-checkbox
                                                v-model="selected"
                                                label="ประจำ"
                                                value="ประจำ"
                                                ></v-checkbox>
                                                <v-checkbox
                                                v-model="selected"
                                                label="Freelance"
                                                value="ปรFreelanceะจำ"
                                                ></v-checkbox>
                                            </v-container>
                                            </template>
                                        </v-flex>
                                        1.ประวันการทำงาน
                                        ชื่องาน
                                        ลักษณะงาน
                                        ประเภทงาน
                                        สถานที่
                                        

                                    </v-flex>
                                </v-col>
                                <!-- </v-container> -->
                            </v-layout>

                        </v-form>
                        <v-layout mt-5 align-center justify-center>
                            <v-flex ma-2 mt-5 mb-2 md4 xs6>
                                <v-btn block depressed @click="back()" elevation="6" rounded x-large color="primary">
                                    ย้อนกลับ
                                </v-btn>
                            </v-flex>
                            <v-flex ma-2 mt-5 mb-2 md4 xs6>
                                <v-btn block depressed @click="submitForm()" elevation="6" rounded x-large color="primary">
                                    ยอมรับ
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
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'

export default {
    name: "applicationFrom",
    components: {
        ThailandAutoComplete
    },

    computed: {
        ...mapState({
            page: store => store.getApi.page,
        }),
        ...sync("*"),
    },

    data: () => ({
        userName:'',
        passWord:'',
        activePicker: null,
        Vaccinated: '',
        selected: [],
        educationalItems:['ปริญญาเอก',
                    'ปริญญาโท',
                    'ปริญญาตรี',
                    'อนุปริญญา',
                    'ปวส',
                    'ปวท',
                    'ปวช',
                    'มัธยมศึกษาตอนปลาย',
                    'มัธยมศึกษาตอนต้น',
                    'ต่ำกว่ามัธยมศึกษา'
],
        education:'',
        items: ['กฎหมาย',
                'การตลาด',
                'เกษตร/จัดสวน/ปศุสัตว์/ประมง/เหมืองแร่',
                'ขาย',
                'เขียนแบบ/งานDrawing/AutoCad/ออกแบบวิศวกรรม',
                'คอมพิวเตอร์/IT/โปรแกรมเมอร์',
                'งานการเงิน-ธนาคาร',
                'งานขนส่ง-คลังสินค้า',
                'งานนำเข้า-ส่งออก',
                'งานบริการลูกค้า-Call Center',
                'งานบัญชี',
                'งานบันเทิง/นักแสดง/นางแบบ/นักร้อง/Stylist/Costume',
                'จัดซื้อ/ธุรการ/ประสานงานทั่วไป',
                'เจ้าหน้าที่ความปลอดภัย(จป.)/สิ่งแวดล้อม/ISO',
                'ช่างเทคนิค/อิเลคโทรนิค/ซ่อมบำรุง/ช่างพิมพ์',
                'นักเขียน/บรรณาธิการ/พิสูจน์อักษร/Copywriter/นักแปลภาษา',
                'บุคคล/ฝึกอบรม',
                'ผลิต/ควบคุมคุณภาพ/โรงงาน',
                'ผู้จัดการ/ผู้อำนวยการ/MD/CEO',
                'แผนกรักษาความปลอดภัย/งานอาคารจอดรถ',
                'แพทย์/เภสัชกร/สาธารณสุข',
                'ภูมิศาสตร์/แผนที่/GIS/ผังเมือง',
                'แม่บ้าน/พี่เลี้ยง/คนสวน',
                'โยธา/สำรวจ/สถาปัตย์/มัณฑนากร/ประเมินราคา',
                'ล่าม/มัคคุเทศก์/จองห้อง/จองตั๋ว',
                'เลขานุการ',
                'วิทยาศาสตร์/Lab/วิจัยพัฒนา',
                'วิศวกร',
                'วิจัย / วิเคราะห์ ( เศรษฐศาสตร์/หุ้น/ประกันภัย/ธนาคาร )',
                'ศิลปะ/กราฟฟิค/ออกแบบ/ช่างภาพ',
                'ส่งเอกสาร/ขับรถ/ส่งผลิตภัณฑ์',
                'สื่อสารมวลชน/นักข่าว/งานวิทยุ/โทรทัศน์/หนังสือพิมพ์',
                'สุขภาพ/โภชนาการ/ความงาม/ฟิตเนส/สปา',
                'เสื้อผ้า/สิ่งทอ/ช่างแพทเทิร์น',
                'ออกแบบเว็บไซต์/Web',
                'อัญมณีและเครื่องประดับ',
                'อาจารย์/ครู/งานวิชาการ',
                'อาหาร/เครื่องดื่ม/กุ๊ก/บาร์เทนเดอร์/พนักงานเสิร์ฟ',
                'อื่นๆ',
                'งาน Part-time/พนักงานชั่วคราว',
                'Freelance'],
        values: ['foo', 'bar'],
        value: null,
        risk: '',
        age:'',
        riskItems: [{
                id: 1,
                riskName: "ประวัติเดินทางไปยังพื้นที่เสี่ยง",
            },
            {
                id: 2,
                riskName: "สัมผัสผู้ป่วยติดเชื้อ",
            },
            {
                id: 3,
                riskName: "ไม่มีความเสี่ยง",
            },
        ],

        lablefirstName: 'ชื่อ',
        placeholderfirstName: 'กรุณาระบุชื่อ',
        firstName: '',
        rulesFirstName: [],

        lablelastName: 'นามสกุล',
        placeholderlastName: 'กรุณาระบุนามสกุล',
        lastName: '',
        rulesLastName: [],

        lablePid: 'เลขประจำตัวประชาชน',
        placeholderPid: 'กรุณาระบุเลขประจำตัว',
        pid: '',
        rulesPid: [],

        lableBirthDay: 'วันเดือนปีเกิด',
        birthDay: '',
        rulesBirthDay: [],

        lableTel: 'เบอร์โทรศัพท์',
        placeholderTel: 'โปรดระบุ เบอร์โทรศัพท์',
        mobile: '',
        rulesTel: [],

        placeholderZipcode: 'รหัสไปรษณีย์',

        lableAdress1: 'ที่อยู่ปัจจุบัน',
        placeholderAdress1: 'กรุณากรอกที่อยู่',
        Adress1: '',
        rulesAdress1: [],

        lableEmail: 'อีเมล',
        placeholderEmail: 'กรุณาระบุอีเมลล์',
        Email: '',
        rulesEmail: [
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        date: null,
        menu: false,
        district: '',
        amphoe: '',
        province: '',
        zipcode: '',
        policy: "1. คำแถลงว่าด้วยการคุ้มครองข้อมูลส่วนบุคคล1.1. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (“นโยบายคุ้มครองข้อมูลส่วนบุคคล”) อธิบายวิธีการที่บริษัท มิตซูบิชิ มอเตอร์ส (ประเทศไทย) จำกัด (ซึ่งต่อไปนี้จะเรียกว่า “MMTh” “เรา” หรือ “ของเรา”) เก็บรวบรวม ใช้ เก็บรักษา เปิดเผย และ/หรือ โอนไปยังต่างประเทศ ซึ่งข้อมูลส่วนบุคคลของลูกค้าในปัจจุบันและอนาคต (“คุณ” หรือ “ของคุณ”) (ตามที่นิยามไว้ในนโยบายนี้) โดยมีวัตถุประสงค์เพื่อคุ้มครองความเป็นส่วนตัวของข้อมูลส่วนบุคคลของคุณ1.2. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ใช้กับช่องทางการสื่อสารทั้งออนไลน์หรือออฟไลน์ที่เราเก็บรวบรวมข้อมูลส่วนบุคคลของคุณ ไม่ว่าทางต่อหน้า ผ่านศูนย์บริการ โรงงาน สถานที่ประกอบกิจการของเรา งานกิจกรรม หรือ ทางโทรศัพท์ผ่านศูนย์บริการข้อมูลลูกค้า (call center) หรือทางออนไลน์ ผ่านทางอีเมล หรือแพลตฟอร์มโซเชียลมีเดีย (เช่น เว็บเพจ Facebook หรือ Line) และช่องทางอื่นๆ ที่เกี่ยวกับการจัดหาผลิตภัณฑ์และบริการให้แก่คุณ รวมถึงการใช้แอปพลิเคชัน Smartphone Link Gateway for M Connect) และ/หรือแอปพลิเคชันอื่นๆ (“แอปพลิเคชัน”) เว็บไซต์ของเรา https://www.mitsubishi-motors.co.th/th และ/หรือเว็บไซต์อื่นๆ (“เว็บไซต์”) และปฏิสัมพันธ์อื่นๆ ระหว่างคุณกับเรา (ซึ่งต่อไปนี้จะรวมเรียกกันว่า “ช่องทางการสื่อสาร”)1.3. เพื่อให้บรรลุวัตถุประสงค์ของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ “ข้อมูลส่วนบุคคล” หมายถึงข้อมูลส่วนบุคคลหรือข้อมูลที่สามารถระบุตัวตนได้ตามที่นิยามไว้ในกฎหมายที่ใช้บังคับ ซึ่งรวมถึงข้อมูลส่วนบุคคลที่มีความละเอียดอ่อน (ตามที่นิยามไว้ในนโยบายนี้)1.4. MMTh มีความมุ่งมั่นในการดำเนินการเพื่อให้มั่นใจว่าความเป็นส่วนตัวของคุณจะได้รับความคุ้มครอง และการประมวลผลข้อมูลส่วนบุคคลของคุณจะเป็นไปตามกฎหมายและข้อบังคับที่เกี่ยวข้อง (ซึ่งอาจมีการแก้ไขเพิ่มเติมและมีการออกกฎหมายใหม่ใช้บังคับแทนเป็นครั้งคราว) เพื่อคุ้มครองข้อมูลส่วนบุคคลในประเทศที่เราเข้าไปและมุ่งหมายจะเข้าไปดำเนินธุรกิจ (“กฎหมายที่ใช้บังคับ”) MMTh จะเก็บรวบรวม ใช้ เก็บรักษา เปิดเผย และโอนไปยังต่างประเทศซึ่งข้อมูลส่วนบุคคลของคุณตามนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้เท่านั้น1.5. โปรดอ่านเนื้อหาต่อไปนี้อย่างระมัดระวังเพื่อทำความเข้าใจมุมมองและการปฏิบัติของ MMTh เกี่ยวกับข้อมูลส่วนบุคคลของคุณและวิธีการที่เราจะประมวลผลข้อมูลดังกล่าว ข้อมูลบางประการเกี่ยวกับคุณมีความจำเป็นสำหรับการจัดหาผลิตภัณฑ์และบริการให้แก่คุณ หากคุณไม่ตกลงที่จะให้ข้อมูลดังกล่าว เราจะไม่สามารถจัดหาผลิตภัณฑ์และบริการให้แก่คุณ และคุณจะไม่สามารถใช้หรือเข้าถึงฟังก์ชั่นและการใช้งานของบริการและผลิตภัณฑ์ของเราทั้งหมดได้1.6. โดยทั่วไปแล้วกิจกรรมของเรา (ซึ่งรวมถึงการให้บริการ และการจำหน่ายผลิตภัณฑ์) ไม่มุ่งเน้นที่ผู้เยาว์ คนเสมือนไร้ความสามารถ หรือคนไร้ความสามารถ ดังนั้น หากคุณมีอายุต่ำกว่า 20 ปี หรือยังไม่บรรลุนิติภาวะตามที่กำหนดในประเทศที่คุณอาศัยอยู่ เป็นคนเสมือนไร้ความสามารถ เป็นคนไร้ความสามารถ (แล้วแต่กรณี) เว้นแต่จะมีสิทธิตามกฎหมาย และคุณต้องการใช้บริการของเรา ใช้แอปพลิเคชันของเรา หรือบริการอื่นๆ จากเรา คุณจะต้องได้รับความยินยอมจากผู้ปกครองหรือผู้แทนโดยชอบธรรมก่อนติดต่อเราหรือก่อนให้ข้อมูลส่วนบุคคลแก่เรา เราไม่เก็บรวบรวมข้อมูลส่วนบุคคลหากเราทราบอยู่แล้วว่าข้อมูลดังกล่าวเป็นข้อมูลของผู้เยาว์ที่อายุน้อยกว่า 20 ปีโดยไม่ได้รับความยินยอมจากผู้ปกครองตามที่กฎหมายกำหนด หรือเป็นของคนเสมือนไร้ความสามารถหรือคนไร้ความสามารถโดยไม่ได้รับความยินยอมจากผู้พิทักษ์หรือผู้อนุบาลตามกฎหมาย1.7. นโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ได้รับการปรับปรุงครั้งล่าสุดเมื่อ 20 เมษายน พ.ศ. 2563 MMTh สงวนสิทธิ์ โดยมีดุลยพินิจแต่เพียงผู้เดียว ในการปรับเปลี่ยน แก้ไข ลบ และปรับปรุงนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้เป็นครั้งคราว MMTh จะใช้ความพยายามตามสมควรเพื่อแจ้งให้คุณทราบและในลักษณะที่เหมาะสมถึงการปรับเปลี่ยนข้อกำหนดใดของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ (เช่น โดยส่งนโยบายที่แก้ไขให้คุณทางอีเมล หรือโดยประกาศการเปลี่ยนแปลงดังกล่าวในช่องทางการสื่อสารของเรา) หากการเปลี่ยนแปลงใดๆ ของนโยบายคุ้มครองข้อมูลส่วนบุคคลนี้ต้องได้รับความยินยอมจากคุณตามกฎหมายที่ใช้บังคับ เราจะขอความยินยอมจากคุณเพื่อให้สอดคล้องกับการเปลี่ยนแปลงดังกล่าว",
    }),

    mounted() {

    },
    created() {
        this.CheckLanuage();
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },

    methods: {
        save(date) {
            this.$refs.menu.save(date)
        },
        select(address) {
            this.district = address.district
            this.amphoe = address.amphoe
            this.province = address.province
            this.zipcode = address.zipcode
        },
        CheckLanuage() {
            if (this.flaglanguage == 'eg') {
                console.log('language : eg');
                this.lablefirstName = 'firstName';
                this.placeholderfirstName = 'Please specify firstName'
                this.rulesFirstName = [
                        value => !!value || this.placeholderfirstName,
                        value => (value && value.length <= 50) || 'Min 50 characters',
                    ],

                    this.lablelastName = 'lastName';
                this.placeholderlastName = 'Please specify lastName';
                this.rulesLastName = [
                        value => !!value || this.placeholderlastName,
                        value => (value && value.length <= 50) || 'Min 50 characters',
                    ],

                    this.lablePid = 'passport';
                this.placeholderPid = 'Please specify passport';
                this.rulesPid = [
                        value => !!value || this.placeholderPid,
                        value => (value && value.length <= 17) || 'Min 17 characters',
                    ],

                    this.lableTel = 'telephone number';
                this.placeholderTel = 'Please specify your Passport';
                this.rulesTel = [
                        value => !!value || this.lableTel,
                        value => (value && value.length <= 17) || 'Min 17 characters',
                    ],

                    this.lableAdress1 = 'address';
                this.placeholderAdress1 = 'Please specify Address';
                this.rulesAdress1 = [
                    value => !!value || this.placeholderAdress1,
                ]

                this.placeholderZipcode = 'zipcode';

                this.lableBirthDay = 'birthday';
                this.placeholderBirthDay = 'Please specify birthday'
                this.rulesBirthDay = [
                    value => !!value || this.placeholderBirthDay,
                ]

                this.lableEmail = 'email';

            }
        },
        submitForm() {









            console.log("submitForm")
            this.z = 'productPackage';
        },
        back(){
            this.z = 'registerConsent';
        }

    },

}
</script>
