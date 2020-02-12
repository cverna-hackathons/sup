package transformator

import "../types"
import "strconv"

func Transform(record *types.SaatchiRecord) types.Entry {
	return types.Entry{
		ImagePublicUrl: record.Image_url,
		Materials: record.Materials,
		Medias: record.All_mediums,
		Subjects: []string{record.All_subject},
		Styles: record.All_styles,
		Size: types.Size{
			Width: record.Width,
			Height: record.Height,
			Unit: "cm",
		},
		Title: record.Artwork_title,
		Country: record.Country,
		Price: (float64(record.Price) / 100),
		Author: types.Author{
			Name: record.First_name + " " + record.Last_name,
			ForeignId: strconv.Itoa(record.Id_user),
		},
	}
}