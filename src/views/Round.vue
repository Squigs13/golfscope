<template>
  <v-card flat>
    <v-card-title>{{ round.courseName }}</v-card-title>
    <v-window v-model="holes">
      <v-window-item
        v-for="n in numberOfHoles"
        :key="`card-${n}`"
      >
        <v-card class="mx-auto" max-width="800">
          <v-card-title>
            Hole {{ n }}
          </v-card-title>
          <v-card-text>
            Score: {{ holesData[n-1].score }}
          </v-card-text>
          <RoundMap class="round-map" :holeData="holesData[n-1]"/>
          <!-- <v-list two-line avatar>
            <v-list-item
              v-for="(shot, i) in holesData[n-1].shots"
              :key="i"
            >
              <v-list-item-avatar tile color="black">
                <span class="white--text">{{ getClubUsed(shot.club) }}</span>
              </v-list-item-avatar>
              {{ (shot.distance * 1.09361).toFixed(2) }}yds
            </v-list-item>
          </v-list> -->
        </v-card>

      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn
        text
        @click="prev"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-item-group
        v-model="holes"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="n in numberOfHoles"
          :key="`btn-${n}`"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            {{ n }}
          </v-btn>
        </v-item>
      </v-item-group>
      <v-btn
        text
        @click="next"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import RoundMap from '@/components/RoundMap.vue'

export default {
  components: {
    RoundMap
  },
  data () {
    return {
      holes: 0,
      clubs: null
    }
  },
  computed: {
    round () {
      return this.$store.getters.rounds.find(element => element.roundID === parseInt(this.$route.params.id))
    },
    holesData () {
      return this.round.holes
    },
    numberOfHoles () {
      return this.round.holes.length
    }
  },
  methods: {
    next () {
      this.holes = this.holes + 1 === this.numberOfHoles
        ? 0
        : this.holes + 1
    },
    prev () {
      this.holes = this.holes - 1 < 0
        ? this.numberOfHoles - 1
        : this.holes - 1
    },
    getClubUsed (clubId) {
      if (clubId > 0) {
        const club = this.$store.getters.clubs.find(element => element.id === clubId)
        return club.tag
      }

      return 'X'
    }
  }
}
</script>

<style scoped>
.round-map {
  height: 600px;
}
</style>
