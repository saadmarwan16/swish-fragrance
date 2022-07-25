import dayjs from "dayjs";

const getFormattedDate = (date: Date | string) => {
    return dayjs(date).format("DD MMM, YYYY")
}

export default getFormattedDate;