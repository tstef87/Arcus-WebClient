import { ResponsiveCalendar } from '@nivo/calendar'

let d = [{"value": 183,
    "day": "2023-05-27"},
    {"value": 350,
    "day": "2023-05-23"},
    {"value": 503,
    "day": "2023-05-15"}]



const MyResponsiveCalendar = ( ) => (


    <ResponsiveCalendar
        data={d}
        from="2023-05-1"
        to="2023-06-01"
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        monthSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
)

export default MyResponsiveCalendar;