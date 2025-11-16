import LifeUpdates from "../consts/bio/life_updates";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { Box, Typography } from "@mui/material";

const LifeUpdate = () => {
    return (
        <Box>
            <Timeline position="right">
                {LifeUpdates.map((update, index) => (
                    <TimelineItem key={update.id}>
                        <TimelineOppositeContent
                            sx={{ 
                                m: 'auto 0',
                                flex: 0.2
                            }}
                            variant="body2"
                            color="primary"
                        >
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: "medium",
                                    color: "primary.main" 
                                }}
                            >
                                {update.date}
                            </Typography>
                            {update.specificDate && (
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        display: "block",
                                        color: "text.secondary",
                                        fontStyle: "italic",
                                        mt: 0.5
                                    }}
                                >
                                    {update.specificDate}
                                </Typography>
                            )}
                        </TimelineOppositeContent>

                        <TimelineSeparator>
                            <TimelineDot 
                                color="primary"
                                sx={{
                                    boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.15)"
                                }}
                            />
                            {index !== LifeUpdates.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>

                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography 
                                variant="h6" 
                                component="span"
                                sx={{ fontWeight: "medium" }}
                            >
                                {update.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {update.description}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    )
}

export default LifeUpdate;