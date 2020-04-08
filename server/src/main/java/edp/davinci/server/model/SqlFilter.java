package edp.davinci.server.model;

import static edp.davinci.server.commons.Constants.*;

import edp.davinci.server.enums.SqlOperatorEnum;
import lombok.Data;
import org.apache.commons.lang.StringUtils;

import java.util.List;
import java.util.regex.Pattern;

@Data
public class SqlFilter {

    private String name;

    private String type;

    private Object value;

    private String sqlType;

    private String operator;

    private List<SqlFilter> children;

    private static String pattern = "^'.*?'$";

    public static class Type {
        public static final String filter = "filter";
        public static final String relation = "relation";
        public static final String and = "and";
        public static final String or = "or";
    }

    public enum NumericDataType {
        TINYINT("TINYINT"),
        SMALLINT("SMALLINT"),
        MEDIUMINT("MEDIUMINT"),
        INT("INT"),
        INTEGER("INTEGER"),
        BIGINT("BIGINT"),
        FLOAT("FLOAT"),
        DOUBLE("DOUBLE"),
        DECIMAL("DECIMAL"),
        NUMERIC("NUMERIC"),
        ;

        private String type;

        NumericDataType(String type) {
            this.type = type;
        }

        public String getType() {
            return type;
        }
    }

    public static String dealFilter(SqlFilter filter){
        StringBuilder condition = new StringBuilder();
        String type = filter.getType();

        if(Type.filter.equalsIgnoreCase(type)){
            condition.append(dealOperator(filter));
        }

        if(Type.relation.equalsIgnoreCase(type)){
            List<SqlFilter> childs = filter.getChildren();
            condition.append(PARENTHESES_START);
            for(int i=0; i<childs.size(); i++){
                condition.append(i == 0 ? dealFilter(childs.get(i)) : SPACE + filter.getValue().toString() + SPACE + dealFilter(childs.get(i)));
            }
            condition.append(PARENTHESES_END);
        }

        return condition.toString();
    }

    private static String dealOperator(SqlFilter filter){
        String name     = filter.getName();
        Object value    = filter.getValue();
        String operator = filter.getOperator();
        String sqlType  = filter.getSqlType();

        Criterion criterion;
        if(SqlOperatorEnum.BETWEEN.getValue().equalsIgnoreCase(operator)){
            List values = (List) value;
            criterion = new Criterion(name, operator, values.get(0), values.get(1), sqlType);
        }else{
            criterion = new Criterion(name, operator, value, sqlType);
        }

        return generator(criterion);
    }

    private static String generator(Criterion criterion){
        StringBuilder whereClause = new StringBuilder();
        if(criterion.isSingleValue()){
            //column='value'
            String value = criterion.getValue().toString();
            whereClause.append(criterion.getColumn() + SPACE + criterion.getOperator() + SPACE);
            if(criterion.isNeedApostrophe() && !Pattern.matches(pattern, value)){
                whereClause.append(APOSTROPHE + value + APOSTROPHE);
            }else{
                whereClause.append(value);
            }

        }else if(criterion.isBetweenValue()){
            //column>='' and column<=''
            String value1 = criterion.getValue().toString();
            whereClause.append(PARENTHESES_START);
            whereClause.append(criterion.getColumn()+ SPACE + SqlOperatorEnum.GREATERTHANEQUALS.getValue() + SPACE);
            if(criterion.isNeedApostrophe() && !Pattern.matches(pattern, value1)){
                whereClause.append(APOSTROPHE + value1 + APOSTROPHE);
            }else{
                whereClause.append(value1);
            }
            whereClause.append(SPACE + SqlFilter.Type.and + SPACE);
            whereClause.append(criterion.getColumn()+ SPACE + SqlOperatorEnum.MINORTHANEQUALS.getValue() + SPACE);
            String value2 = criterion.getSecondValue().toString();
            if(criterion.isNeedApostrophe() && !Pattern.matches(pattern, value2)){
                whereClause.append(APOSTROPHE + value2 + APOSTROPHE);
            }else{
                whereClause.append(value2);
            }
            whereClause.append(PARENTHESES_END);

        }else if(criterion.isListValue()){
            List values = (List) criterion.getValue();
            whereClause.append(criterion.getColumn() + SPACE + criterion.getOperator() + SPACE);
            whereClause.append(PARENTHESES_START);
            if(criterion.isNeedApostrophe() && !Pattern.matches(pattern, values.get(0).toString())){
                whereClause.append(APOSTROPHE +
                        StringUtils.join(values,APOSTROPHE + COMMA + APOSTROPHE) +
                        APOSTROPHE);
            }else{
                whereClause.append(StringUtils.join(values, COMMA));
            }
            whereClause.append(PARENTHESES_END);
        }
        return whereClause.toString();
    }

}
