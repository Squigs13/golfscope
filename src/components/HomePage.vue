<template>
  <v-container>
    <v-row dense>
      <v-col
        v-for="round in rounds"
        :key="round.roundID"
        cols="12"
        md="6"
        lg="4"
        xl="3"
      >
        <v-card>
          <v-list-item two-line>
            <v-list-item-content>
              <div class="overline mb-4">{{ round.startedDate | moment("DD MMM YYYY") }}</div>
              <v-list-item-title class="headline mb-1">{{ round.courseName }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar
              size="80"
              color="grey"
              class="white--text"
            >{{ scoreVsPar(round.avgScoreVsPar) }}</v-list-item-avatar>
          </v-list-item>
          <v-card-text>
            <v-subheader>Fairways in Regulation</v-subheader>
            <v-progress-linear
              :value="round.fairwaysInRegulation"
              color="blue"
              height="15"
            >
              <strong>{{ Math.ceil(round.fairwaysInRegulation) }}%</strong>
            </v-progress-linear>
            <v-subheader>Greens in Regulation</v-subheader>
            <v-progress-linear
              :value="round.greensInRegulation"
              color="blue"
              height="15"

            >
              <strong>{{ Math.ceil(round.greensInRegulation) }}%</strong>
            </v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-btn class="mx-auto" text :to="`/round/${round.roundID}`">View Round</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HomePage',

  data: () => ({
    //
  }),
  computed: {
    rounds () {
      return this.$store.getters.rounds
    }
  },
  methods: {
    scoreVsPar: function (score) {
      if (score > 0) {
        return '+' + score
      } else if (score === 0) {
        return 'E'
      } else {
        return score
      }
    },
    scoreCard: function (holes) {
      var headers = [{ text: '', value: 'name' }]
      var scores = [{ name: 'Par' }, { name: 'Score' }]
      holes.forEach(hole => {
        var holeVal = 'hole' + hole.holeNum
        headers.push({ text: hole.holeNum, value: holeVal })
        scores[0][holeVal] = hole.par
        scores[1][holeVal] = hole.score
      })

      return { head: headers, data: scores }
    }
  }
}
</script>
