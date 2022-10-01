function do_allocation(number_of_people, number_of_buses) {
    let result = [];
    let busCapacity = 1;
    let i = 0;
    while (number_of_people > 0) {
        if (i < number_of_buses) {
            result.push(Math.min(number_of_people, busCapacity));
            number_of_people -= busCapacity;
            busCapacity += result[i];
            i++;
        } else {
            result.push(0);
        }
    }
    return result;
}

console.log(do_allocation(15, 9))