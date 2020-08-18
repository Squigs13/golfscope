<template>
  <div>
    <div class="text-center text-h5 mt-4">
      {{ round.courseName }}
    </div>
    <div class="text-center text-caption mb-4">{{ round.startedDate | moment("HH:mm DD MMM YYYY") }}</div>
  <v-card class="mx-auto mt-4" max-width="800">
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
    <v-window v-model="holes">
      <v-window-item
        v-for="n in numberOfHoles"
        :key="`card-${n}`"
      >
        <div class="d-flex justify-space-between align-center">
          <div class="pl-6">Hole {{ n }}</div>
          <div>Par: {{ holesData[n-1].par }}</div>
          <div>Hole Avg: {{ holesData[n-1].avgScore }}</div>
          <div>
            <v-avatar
              tile
              size="60"
              color="primary"
              class="white--text"
            >
              {{ holesData[n-1].score }}
            </v-avatar>
          </div>
        </div>
        <RoundMap class="round-map" :holeData="holesData[n-1]"/>
        <v-simple-table>
          <tbody>
            <tr
              v-for="(shot, i) in holesData[n-1].shots"
              :key="i"
            >
              <td>{{ i + 1 }}.</td>
              <td v-if="shot.strokeType != 'Penalty'">
                <v-list-item-avatar color="black">
                  <span class="white--text">{{ getClubUsed(shot.club) }}</span>
                </v-list-item-avatar>
              </td>
              <td v-else>
                Penalty
              </td>
              <td class="text-capitalize">{{ shot.lie }}</td>
              <td v-if="!shot.lostBall && shot.strokeType != 'Penalty'" class="font-weight-bold">{{ getShotDistance(shot.distance) }}</td>
              <td v-else-if="!shot.lostBall"></td>
              <td v-else><v-icon color="red">mdi-close-circle-outline</v-icon></td>
              <td v-if="!shot.lostBall && shot.strokeType != 'Penalty'">{{ getShotDistance(shot.remaining) }}</td>
              <td v-else></td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-window-item>
    </v-window>
  </v-card>
  </div>
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
    },
    getShotDistance (distance) {
      if (distance > 15) {
        return (distance * 1.09361).toFixed(2) + 'yds'
      } else {
        return (distance * 3.281).toFixed(2) + 'ft'
      }
    }
  }
}
</script>

<style scoped>
.round-map {
  height: 600px;
}
</style>
