getMaxDate(massModel: MassModel){
    let maxDate: Date | null = null;

    // Parcourez les données pour trouver la date maximale
    massModel.masses.forEach((massDayData) => {
        const currentDate = new Date(massDayData.days);

        if (maxDate === null || currentDate > maxDate) {
          maxDate = currentDate;
        }
      });
      console.log("La date maximale est :", maxDate!.toISOString().substring(0, 10));
    }