/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import { ru } from 'date-fns/locale'
import enUsLocale from "date-fns/locale/en-US";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    date: {
      fontSize: '60px',
    },
    containerPad: {
        padding: '15px'
    },
    dateContaniner: {
        display: 'flex',
        alignItems: 'center'
    }
  }));

const Container = styled.div`
    display: flex;
    width: 100%;
    background: inherit;
    padding: 5px;
    box-sizing: border-box;
`

const ButtonWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    z-index: 2;
    background: inherit;
`

const Button = styled.button`
    border: none;
    text-decoration: none;
    cursor: pointer;
    border-radius: 12%;
    width: 20px;
    height: 50px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-bottom: 5px;
`
const ButtonToday = styled.button`
    border-radius: 8px;
    width: 70px;
    height: 40px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    color: #57de57;
    background-color: #dbf5dc;
    border: none;
`

const DateListScrollable = styled.div`
    display: flex;
    overflow-x: scroll;
    scrollbar-width: none;
    margin: 2px 0 2px -40px;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        -webkit-appearance: none;
        display: none;
    }
`

const MonthContainer = styled.div`
    & span {
        display: flex;
        flex-direction: column;
    }
`
const DateDayItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    margin: 0 0 0 5px;
    width: 28px;
    height: 50px;
    flex-shrink: 0;
`
const DaysContainer = styled.div`
    display: flex;
    z-index: 1;
`

const DayLabel = styled.div`
    font-size: 14px;
    margin: 4px 0 0 0;
`

const DateLabel = styled.div`
    font-size: 18px;
`

export default function Datepicker({beforeDate, endDate, selectDate, getSelectedDay, color, labelFormat, language}) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const firstSection = {marginLeft: '40px'};
    const current = new Date();
    const startDate = addDays(current, -beforeDate);
    const lastDate = addDays(startDate, endDate || 90);
    const primaryColor = color || 'rgb(54, 105, 238)';
    const selectedStyle = {fontWeight:"bold",width:"25px",height:"50px",borderRadius:"12%",border:`2px solid ${primaryColor}`,color:primaryColor};
    const buttonColor = {background: primaryColor};
    const labelColor= {color: primaryColor};

    const getStyles = (day) => {
        if (isSameDay(day, selectedDate)) {
            return(selectedStyle);
        }
        return null
    };

    const getId = (day) => {
        if (isSameDay(day, selectedDate)) {
            return ('selected')
        } else {
            return ("")
        }
    };

    function renderDays(lang) {
        const dayFormat = "E";
        const dateFormat = "d";
        const months = [];
        let days = [];
        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            console.log(differenceInMonths(lastDate, startDate))
            const month = startOfMonth(addMonths(startDate, i));
            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));
            for (let j = start; j < end; j++) {
                days.push(
                    <DateDayItem id={`${getId(addDays(startDate, j))}`}
                         style={getStyles(addDays(month, j))}
                         key={addDays(month, j)}
                         onClick={() => onDateClick(addDays(month, j))}
                         >
                        <DayLabel>
                            {format(addDays(month, j), dayFormat)}
                        </DayLabel>
                        <DateLabel>
                            {format(addDays(month, j), dateFormat)}
                        </DateLabel>
                    </DateDayItem>
                );
            }
            months.push(
                <div>
                                       
                    <MonthContainer key={month}>
                        <DaysContainer style={i===0?firstSection:null}>
                            {days}
                        </DaysContainer>
                    </MonthContainer>
                </div>
            );
            days = [];
        }
        
        return<DateListScrollable id={"container"}>
                    {months}
                </DateListScrollable>
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    const nextWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft += width - 60;
    };

    const prevWeek = () => {
        const e = document.getElementById('container');
        const width = e ? e.getBoundingClientRect().width : null;
        e.scrollLeft -= width - 60;
    };

    let langCode
    switch (language) {
        case "en":
            langCode = enUsLocale
            break;
        case "ru":
            langCode = ru
            break;
        default:
            langCode = ru
            break;
    }

    const classes = useStyles();
    return (<div className={classes.root}>
            <Grid container spacing={2} className={classes.containerPad}>
                <Grid item sm container className={classes.dateContaniner}>
                    <Grid item className={classes.date}>{new Date().getDate()}</Grid>
                    <Grid item>
                        <Grid>{format(new Date(), "E")}</Grid>
                        <Grid>{format(new Date(), labelFormat)}</Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <ButtonToday onClick={() => onDateClick(new Date())}>Today</ButtonToday>
                </Grid>
            </Grid>            
            <Container>
                <ButtonWrapper>
                    <Button style={buttonColor} onClick={prevWeek}>←</Button>
                </ButtonWrapper>
                {renderDays(langCode)}
                <ButtonWrapper>
                    <Button style={buttonColor} onClick={nextWeek}>→</Button>
                </ButtonWrapper>
            </Container>
        </div>
            
    )
}