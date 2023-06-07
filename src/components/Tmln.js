import React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

export const Tmln = ({data}) => {
  return (
    <div style={styles.container}>
      <Timeline position="left" style={styles.timeline}>
        {data.map(({question, questiom_preamble,solved_correctly}) => (
        <TimelineItem style={styles.timelineItem}>
          <TimelineSeparator>
            <TimelineDot color="secondary" onClick={() => window.location.assign('http://mathematix.duckdns.org:3000/')} style={styles.timelineDot} />
            <TimelineConnector style={styles.timelineConnector} />
          </TimelineSeparator>
          <TimelineContent style={{marginTop: -55}}>{question}</TimelineContent>
        </TimelineItem>))}
      </Timeline>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeline: {
    transform: 'rotate(90deg)',
  },
  timelineItem: {
    marginBottom: '40px',
  },
  timelineDot: {
    backgroundColor: '#FF5722',
  },
  timelineConnector: {
    backgroundColor: '#FF5722',
  },
  timelineContent: {
    backgroundColor: '#F5F5F5',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  },
};
