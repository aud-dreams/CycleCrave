import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
// import AppleHealthKit from "react-native-health";

const sampleSleepData = [
  {
    startDate: new Date('2024-02-19T02:00:00'),
    endDate: new Date('2024-02-19T07:00:00'),
  }, // Sun
  {
    startDate: new Date('2024-02-19T23:50:00'),
    endDate: new Date('2024-02-20T08:00:00'),
  }, // Mon
  {
    startDate: new Date('2024-02-20T22:30:00'),
    endDate: new Date('2024-02-21T06:15:00'),
  }, // Tue
  {
    startDate: new Date('2024-02-21T23:30:00'),
    endDate: new Date('2024-02-22T09:00:00'),
  }, // Wed
  {
    startDate: new Date('2024-02-22T22:45:00'),
    endDate: new Date('2024-02-23T07:30:00'),
  }, // Thu
  {
    startDate: new Date('2024-02-23T23:15:00'),
    endDate: new Date('2024-02-24T06:30:00'),
  }, // Fri
  {
    startDate: new Date('2024-02-24T21:45:00'),
    endDate: new Date('2024-02-25T07:00:00'),
  }, // Sat
]

const SleepPage = () => {
  const chartData = {
    labels: sampleSleepData.map((sleepSession) => {
      return sleepSession.startDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
      })
    }),
    datasets: [
      {
        data: sampleSleepData.map((sleepSession) => {
          return (
            (sleepSession.endDate.getTime() -
              sleepSession.startDate.getTime()) /
            (1000 * 60 * 60)
          )
        }),
      },
    ],
  }

  const sleepStatsTable = (
    <View style={styles.sleepStatsContainer}>
      <Text style={styles.sleepStatsTitle}>Sleep Stats</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Date</Text>
          <Text style={styles.tableHeader}>Time of Sleep</Text>
          <Text style={styles.tableHeader}>Wake up Time</Text>
          <Text style={styles.tableHeader}>Sleep Duration</Text>
        </View>
        {sampleSleepData.map((sleepSession, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCol1}>
              {sleepSession.startDate.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
              })}
            </Text>
            <Text style={styles.tableCols2To4}>
              {sleepSession.startDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.tableCols2To4}>
              {sleepSession.endDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
            <Text style={styles.tableCols2To4}>
              {(
                (sleepSession.endDate.getTime() -
                  sleepSession.startDate.getTime()) /
                (1000 * 60 * 60)
              ).toFixed(2)}{' '}
              hours
            </Text>
          </View>
        ))}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.sleepTitle}>Sleep</Text>
      <ScrollView
        contentContainerStyle={styles.sleepContainer}
        style={styles.scrollView}
      >
        <View style={styles.sleepGraphContainer}>
          <Text style={styles.sleepGraphTitle}>This Week's Sleep</Text>
          <LineChart
            data={chartData}
            width={350}
            height={220}
            yAxisSuffix="h"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(117, 193, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '2',
                strokeWidth: '2',
                stroke: '#75C1FF',
              },
              propsForBackgroundLines: {
                stroke: '75C1FF',
              },
            }}
            style={styles.chart}
            bezier
          />
        </View>
        {sleepStatsTable}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF4F3',
    padding: 10,
  },
  sleepContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepTitle: {
    fontWeight: 'bold',
    marginVertical: 20,
    fontSize: 35,
    fontFamily: 'Cormorant_700Bold',
    marginTop: 50,
    marginBottom: 20,
  },
  sleepGraphContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sleepGraphTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Cormorant_700Bold',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  sleepStatsContainer: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sleepStatsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Cormorant_700Bold',
  },
  tableContainer: {
    marginTop: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cormorant_700Bold',
    padding: 10,
  },
  tableCol1: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tableCols2To4: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(117, 193, 255, 0.35)',
  },
  scrollView: {
    maxHeight: 700,
  },
})

export default SleepPage
