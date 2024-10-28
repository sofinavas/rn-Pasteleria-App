import { FlatList, StyleSheet,Text} from "react-native";
import Category from "./Category";
import { useGetCategoriesQuery } from "../services/shop";
import LoadingSpinner from "./LoadingSpinner";

const Categories = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  
  if (isLoading) return <LoadingSpinner/>
 

  if(error){
    return <Text>Error al cargar las categorias: {error.message}</Text>
  }

  if(categories.length === 0){
    return <Text>No categories found</Text>
  }
  return (
    
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Category item={item} />}
      />

  );
};

export default Categories;

const styles = StyleSheet.create({});
