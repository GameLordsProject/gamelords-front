<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <v-card height="100%" class="px-9 pt-4 bgRanking">
    <div class="desktop">
      <v-card-title>
        <h2 class="got">Ranking</h2>
      </v-card-title>
      <v-card-text>

        <v-text-field v-model="inputText" placeholder="Filter a character" prepend-icon="mdi-magnify" class="got"
          :loading="loading" clearable />
      </v-card-text>
      <div>
        <v-switch v-model="switch1" :label="`Show All`"></v-switch>
        <div class="box">
          <RankingComponent v-for="(votedcharacter, idx) in filterMyCharacter" :key="idx"
            :votedcharacter="votedcharacter">
          </RankingComponent>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios'
import RankingComponent from '@/components/rankingComponent.vue'
export default {
  name: "RankingPage",
  components: { RankingComponent },
  data() {
    return {
      inputText: '',
      limit: -1,
      loading: false,
      switch1: false,
      query: this.$route.query.q,
      topLikes: [],
      topHates: [],
      votedCharacters: [],
      character: {},
      booksCharacters: ["Addam Marbrand", "Addam Velaryon", "Addison Hill", "Aegon Frey (son of Aenys)", "Aegon I Targaryen", "Aegon II Targaryen", "Aegon III Targaryen", "Aegon IV Targaryen", "Aegon V Targaryen", "Aegon Targaryen (son of Rhaegar)", "Aegon Targaryen (son of Aenys I)", "Aegor Rivers", "Aelinor Penrose", "Aemma Arryn", "Aemon Blackfyre", "Aemond Targaryen", "Aenys Frey", "Aenys I Targaryen", "Aerion Targaryen", "Aeron Greyjoy", "Aerys I Targaryen", "Aerys II Targaryen", "Aggo", "Alannys Harlaw", "Alayaya", "Alerie Hightower", "Alesander Frey", "Alester Florent", "Alester Norcross", "Alicent Hightower", "Alla Tyrell", "Eddara Tallhart", "Eddard Stark", "Eddison Tollett", "Edmure Tully", "Edmyn Tully", "Edric Dayne", "Edric Storm", "Edwyle Stark", "Edwyn Frey", "Elaena Targaryen", "Elder Brother (Quiet Isle)", "Eldon Estermont", "Eleanor Mooton", "Eleyna Westerling", "Elia Sand", "Elia Martell", "Elinor Tyrell", "Ellaria Sand", "Elmar Frey", "Elwood Meadows", "Elyana Vypren", "Emberlei Frey", "Emma", "Emmon Frey", "Erena Glover", "Erik Ironmaker", "Ermesande Hayford", "Willis Fell", "Willow Heddle", "Wylis Manderly", "Wylla Manderly", "Wyman Manderly", "Wynafryd Manderly", "Wynton Stout", "Xaro Xhoan Daxos", "Ygritte", "Yohn Royce", "Yoren", "Zachery Frey", "Zia Frey", "Lancel Lannister", "Lann the Clever", "Lanna (Happy Port)", "Lanna Lannister", "Larence Snow", "Larys Strong", "Layna", "Leana Frey", "Leathers", "Lem", "Leobald Tallhart", "Leonette Fossoway", "Lewyn Martell", "Leyton Hightower", "Lollys Stokeworth", "Loras Tyrell", "Lorcas", "Lorent Marbrand", "Loreza Sand", "Lothar Frey", "Renly Baratheon", "Renly Norcross", "Rhae Targaryen", "Rhaegar Frey", "Rhaegar Targaryen", "Rhaegel Targaryen", "Rhaego", "Rhaella Targaryen", "Rhaelle Targaryen", "Rhaena Targaryen (daughter of Daemon)", "Rhaenys Targaryen", "Rhaenys Targaryen (daughter of Aemon)", "Rhaenys Targaryen (daughter of Rhaegar)", "Rhea Royce", "Rickard Karstark", "Rickard Stark", "Rickard Wylde", "Rickon Stark", "Robb Stark", "Robert Arryn", "Robert Baratheon", "Robert Brax (son of Flement)", "Robert Flowers", "Robert Frey (son of Raymund)", "Robett Glover", "Euron Greyjoy", "Eustace (Dance of the Dragons)", "Eustace Osgrey", "Falia Flowers", "Falyse Stokeworth", "Flement Brax", "Galazza Galare", "Galbart Glover", "Garlan Tyrell", "Garth Tyrell", "Lothor Brune", "Luceon Frey", "Lucias Vypren", "Lucion Lannister", "Lucos Chyttering", "Luthor Tyrell", "Luwin", "Lyanna Mormont", "Lyanna Stark", "Lyman Beesbury", "Lynesse Hightower", "Lyonel Baratheon", "Lyonel Corbray", "Lyonel Frey", "Lyonel Strong", "Lyonel Tyrell (lord)", "Lyra Mormont", "Lysa Arryn", "Lythene Frey", "Mace Tyrell", "Maege Mormont", "Maegelle Frey", "Maegor I Targaryen", "Maelor Targaryen", "Alliser Thorne", "Alyn Connington", "Alyn Frey", "Alyn Haigh", "Alyn Velaryon", "Alys Arryn", "Alys Karstark", "Alysane Mormont", "Alysanne Bulwer", "Alysanne Targaryen", "Alyx Frey", "Amarei Crakehall", "Ambrose Butterwell", "Amerei Frey", "Amory Lorch", "Andrik", "Androw Frey", "Anguy", "Anya Waynwood", "Archibald Yronwood", "Ardrian Celtigar", "Areo Hotah", "Arianne Martell", "Arlan of Pennytree", "Arnolf Karstark", "Robin Greyjoy", "Robin Ryger", "Rodrik Cassel", "Rodrik Greyjoy", "Rodrik Harlaw", "Rodwell Stark", "Rohanne Webber", "Rollam Westerling", "Ronnet Connington", "Roone", "Roose Bolton", "Rorge", "Rosey", "Roslin Frey", "Rossart", "Runciter", "Malwyn Frey", "Mance Rayder", "Mandon Moore", "Marei", "Margaery Tyrell", "Marianne Vance", "Marillion", "Marissa Frey", "Mariya Darry", "Maron Greyjoy", "Maron Volmark", "Marq Piper", "Martyn Lannister", "Marwyn", "Mathis Frey", "Mathis Rowan", "Arthor Karstark", "Arthur Dayne", "Artos Stark", "Arwood Frey", "Arwyn Frey", "Arya Stark", "Arys Oakheart", "Asha Greyjoy", "Aurane Waters", "Axell Florent", "Azor Ahai", "Baela Targaryen", "Baelor I Targaryen", "Baelor Targaryen (son of Daeron II)", "Balon Greyjoy", "Balon Swann", "Barbrey Dustin", "Barristan Selmy", "Barth", "Barthogan Stark", "Beck", "Gawen Glover", "Gawen Westerling", "Gendry", "Genna Lannister", "Gerion Lannister", "Gerold Dayne", "Gerold Hightower", "Gerold Lannister", "Gerris Drinkwater", "Ghost of High Heart", "Gilly", "Gilwood Hunter", "Gormon Tyrell", "Gormond Goodbrother", "Gran Goodbrother", "Gregor Clegane", "Grenn", "Grey King", "Grey Worm", "Greydon Goodbrother", "Ryam Redwyne", "Ryella Frey", "Ryella Royce", "Ryman Frey", "Ryon Allyrion", "Saera Targaryen", "Salladhor Saan", "Samwell Tarly", "Sandor Clegane", "Sandor Frey", "Sansa Stark", "Sarella Sand", "Sarra Frey", "Satin", "Sawane Botley", "Selwyn Tarth", "Selyse Florent", "Serra Frey", "Shae", "Shella Whent", "Shireen Baratheon", "Shirei Frey", "Meera Reed", "Megga Tyrell", "Melisandre", "Mellos", "Merianne Frey", "Meribald", "Merrett Frey", "Meryn Trant", "Mina Tyrell", "Mirri Maz Duur", "Missandei", "Monster", "Monterys Velaryon", "Moqorro", "Moreo Tumitis", "Bella", "Belwas", "Ben", "Ben Plumm", "Benjen Stark", "Beren Tallhart", "Beric Dondarrion", "Beron Stark", "Beth Cassel", "Betharios of Braavos", "Biter", "Boros Blount", "Bowen Marsh", "Boy", "Groleo", "Gulian Swann", "Gunthor Hightower", "Gwin Goodbrother", "Gyldayn", "Gyles Rosby", "Gysella Goodbrother", "Halder", "Halys Hornwood", "Harlon Greyjoy", "Mors Umber", "Morya Frey", "Murmison", "Mushroom", "Mya Stone", "Mylenda Caron", "Myles Smallwood", "Myranda Royce", "Myrcella Baratheon", "Naerys Targaryen", "Nestor Royce", "Bradamar Frey", "Brandon Stark", "Brandon Stark (son of Cregan)", "Bran Stark", "Brandon Tallhart", "Brienne of Tarth", "Bronn", "Bryan Frey", "Bryen", "Brynden Rivers", "Brynden Tully", "Carolei Waynwood", "Cassana Estermont", "Catelyn Stark", "Skahaz mo Kandaq", "Stafford Lannister", "Stannis Baratheon", "Stannis Seaworth", "Steffon Baratheon", "Steffon Frey", "Steffon Seaworth", "Steffon Darklyn", "Stevron Frey", "Stonesnake", "Styr", "Sybell Spicer", "Sylva Santagar", "Nute", "Nymeria", "Nymeria Sand", "Obara Sand", "Obella Sand", "Oberyn Martell", "Olenna Redwyne", "Olyvar Frey", "Orwyle", "Orton Merryweather", "Orys Baratheon", "Osha", "Osmund Frey", "Osmund Kettleblack", "Osney Kettleblack", "Oswell Whent", "Otto Hightower", "Cersei Frey", "Cersei Lannister", "Chett", "Clement", "Cleon", "Cleos Frey", "Clydas", "Coldhands", "Colmar Frey", "Corlys Velaryon", "Cortnay Penrose", "Cotter Pyke", "Craster", "Cregan Karstark", "Cregan Stark", "Creighton Longbough", "Cressen", "Criston Cole", "Cynthea Frey", "Daario Naharis", "Daella Targaryen (daughter of Jaehaerys I)", "Daemon I Blackfyre", "Daemon II Blackfyre", "Harras Harlaw", "Harren Hoare", "Harrion Karstark", "Harrold Hardyng", "Harrold Westerling", "Harry Strickland", "Harwin", "Harwin Strong", "Harwyn Hoare", "Harys Haigh", "Harys Swyft", "Helaena Targaryen", "Helman Tallhart", "High Sparrow", "Hizdahr zo Loraq", "Hobber Redwyne", "Hodor", "Horas Redwyne", "Hosteen Frey", "Hoster Frey", "Hoster Tully", "Hot Pie", "Hother Umber", "Howland Reed", "Hugh Hammer", "Pate of the Blue Fork", "Patrek Vance", "Paxter Redwyne", "Penny", "Perra Frey", "Perriane Frey", "Perwyn Frey", "Petyr Baelish", "Petyr Frey", "Podrick Payne", "Pyat Pree", "Pycelle", "Pylos", "Pypar", "Qarlton Chelsted", "Symond Frey", "Syrio Forel", "Taena of Myr", "Tanda Stokeworth", "Theodore Tyrell", "Theon Greyjoy", "Thoros of Myr", "Timett", "Tion Frey", "Tom of Sevenstreams", "Tommen Baratheon", "Daemon Sand", "Daemon Targaryen", "Daena Targaryen", "Daenerys Targaryen (daughter of Aegon IV)", "Daenerys Targaryen", "Daeron I Targaryen", "Daeron II Targaryen", "Daeron Targaryen (son of Viserys I)", "Daeron Targaryen (son of Maekar I)", "Dagmer", "Dagon Greyjoy", "Damion Lannister", "Damon Lannister (son of Jason)", "Damon Vypren", "Danwell Frey", "Dareon", "Daven Lannister", "Davos Seaworth", "Delena Florent", "Della Frey", "Delonne Allyrion", "Denyo Terys", "Denys Mallister", "Desmond (Grand Maester)", "Desmond Grell", "Qhorin Halfhand", "Quaithe", "Quellon Greyjoy", "Quenton Greyjoy", "Quentyn Martell", "Qyburn", "Rakharo", "Ramsay Snow", "Randyll Tarly", "Rattleshirt", "Raymun Redbeard", "Raymund Frey", "Humfrey Wagstaff", "Hyle Hunt", "Illifer", "Illyrio Mopatis", "Ilyn Payne", "Imry Florent", "Irri", "Jacelyn Bywater", "Jaehaera Targaryen", "Jaehaerys I Targaryen", "Jaehaerys Targaryen (son of Aegon II)", "Jaehaerys II Targaryen", "Jaime Frey", "Jaime Lannister", "Jammos Frey", "Janei Lannister", "Janos Slynt", "Jared Frey", "Jason Mallister", "Jason Lannister", "Jasper Wylde", "Jeor Mormont", "Jeyne Arryn", "Jeyne Goodbrook", "Devan Seaworth", "Dickon Frey", "Dickon Tarly", "Donal Noye", "Donel Greyjoy", "Donella Hornwood", "Donnel Haigh", "Donnel Waynwood", "Donnor Stark", "Dontos Hollard", "Doran Martell", "Dorea Sand", "Drogo", "Duncan Targaryen", "Dunstan Drumm", "Duram Bar Emmon", "Tormund", "Torrhen Stark", "Tristifer Botley", "Trystane Martell", "Tybolt Hetherspoon", "Tybolt Lannister", "Tyene Sand", "Tygett Lannister", "Tyland Lannister", "Tyrek Lannister", "Tyrion Lannister", "Tyrion Tanner", "Tysane Frey", "Tysha", "Tyta Frey", "Tytos Blackwood", "Tytos Brax", "Tytos Lannister", "Tywin Frey", "Tywin Frey (son of Raymund)", "Tywin Lannister", "Jeyne Heddle", "Jeyne Poole", "Jeyne Westerling (wife of Maegor I)", "Jeyne Westerling", "Jhiqui", "Jhogo", "Joanna Lannister", "Joffrey Baratheon", "Jojen Reed", "Jon Arryn", "Jon Brax", "Jon Connington", "Jon Fossoway", "Jon Snow", "Jon Waters", "Jon Wylde", "Jonelle Cerwyn", "Jonnel Stark", "Jonos Bracken", "Jonos Frey", "Jorah Mormont", "Jorelle Mormont", "Jory Cassel", "Josmyn Peckledon", "Utherydes Wayn", "Val", "Valarr Targaryen", "Varamyr", "Vargo Hoat", "Varys", "Victaria Tyrell", "Victarion Greyjoy", "Visenya Targaryen", "Viserys Targaryen", "Viserys I Targaryen", "Viserys II Targaryen", "Waif", "Walda Frey (daughter of Edwyn)", "Walda Frey (daughter of Lothar)", "Walda Frey (daughter of Walton)", "Walda Frey (daughter of Merrett)", "Walda Frey (daughter of Rhaegar)", "Walda Rivers", "Walda Rivers (daughter of Aemon)", "Walder Brax", "Walder Frey (son of Jammos)", "Walder Frey (son of Ryman)", "Walder Frey (son of Merrett)", "Walder Frey (son of Emmon)", "Walder Frey", "Walder Goodbrook", "Walder Haigh", "Walder Vance", "Wallace Waynwood", "Walton Frey", "Waltyr Frey", "Joy Hill", "Joyeuse Erenford", "Justin Massey", "Kaeth", "Karyl Vance", "Kedge Whiteye", "Kevan Lannister", "Kyra Frey", "Laena Velaryon", "Laenor Velaryon", "Waymar Royce", "Weasel", "Wendel Frey", "Wendel Manderly", "Wex Pyke", "Whalen Frey", "Will", "Willamen Frey", "Willam Stark", "Willas Tyrell", "Willem Darry", "Willem Frey", "Willem Lannister"],
    };
  },
  computed: {
    filterMyCharacter() {
      if (this.switch1) {
        return this.topLikes.filter(e => e.name.toLowerCase().includes(this.inputText.toLowerCase())).sort((a, b) => b.likes - a.likes).slice(0, this.limit)
      }
      return this.votedCharacters.filter(e => e.name.toLowerCase().includes(this.inputText.toLowerCase())).sort((a, b) => b.likes - a.likes).slice(0, 20)
    }
  },
  mounted() {
    this.findCharactersByVotes()
  },
  methods: {
    search() {
      this.$router.push({ path: "/search", query: { q: this.query } });
    },
    async findCharactersByVotes() {
      this.loading = true
      const { data } = await axios.get(`https://westerosrising-api.herokuapp.com/characters`);

      this.votedCharacters = data
      this.topLikes = this.votedCharacters.sort((a, b) => b.likes - a.likes)
      this.topHates = this.votedCharacters.sort((a, b) => b.hates - a.hates)
      if (this.switch1) {
        this.votedCharacters = this.topLikes
      }

      this.loading = false
    },
  }
}
</script>


<style scoped>
.box {
  overflow-y: auto;
  height: 60vh !important;
  border-radius: 12px;
}

.bgRanking {
  background-image: linear-gradient(rgba(0, 0, 0, 0.726), rgba(255, 255, 255, 0.048)), url('https://media.discordapp.net/attachments/1020282879177146368/1022793640910790706/168427.webp?') !important;
  background-position: center;
  background-size: cover;
  /* Resize the background image to cover the entire container */
}

@media (min-width: 800px) {
  .box {
    margin: auto;
    height: 700px !important;
  }

  .desktop {
    width: 60%;
    margin: auto;
  }

  h2 {
    text-align: center !important;
    width: 100%;
    margin: 0 !important;
  }

  .box::-webkit-scrollbar {
    width: 15px;
  }

  .box::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  .box::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  .box::-webkit-scrollbar-thumb:hover {
    background: white;
  }
}
</style>
