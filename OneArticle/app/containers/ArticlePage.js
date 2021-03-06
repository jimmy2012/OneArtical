import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    Dimensions,
} from 'react-native'
import {connect} from 'react-redux'
import Article from '../components/Article'
import SplashScreen from 'react-native-splash-screen'
import {REFRESH_ARTICLE_DONE,SPLASH_SHOW,REFRESH_ARTICLE_DOING} from '../constants/ActionTypes'
import {todayArticle,hideSplash,changeFontSize,changeBgColor,switchThemeModel,switchStylesModalState} from '../action/actions'
import ModalSettings from '../components/ModalSettings'

const {width} = Dimensions.get('window')

class ArticlePage extends Component {

    componentDidMount() {
        //数据请求做一个短暂的延迟处理，几乎没有影响都速度，
        //原因，persist初始化数据需要时间，你可以打印log就知道了
        setTimeout(()=>{
            this.props.todayArticle()
        },10)
    }

    shouldComponentUpdate(nextProps,nextState) {
        if (nextProps.article.status == REFRESH_ARTICLE_DONE
            && nextProps.splash.splashState == SPLASH_SHOW) {
            this.props.hideSplash()
            SplashScreen.hide()
        }
        return true
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={true}
                    translucent={true}
                    networkActivityIndicatorVisible={false}
                />
                <Article
                    articleData = {this.props.article.articleData == null ? null : this.props.article.articleData.data}
                    articleFontSize = {this.props.styles.articleFontSize}
                    articleMainColor =  {this.props.styles.articleMainColor}
                    articleSecondColor =  {this.props.styles.articleSecondColor}
                    isLoading = {this.props.article.status == REFRESH_ARTICLE_DOING}
                    dayStyle = {this.props.styles.dayStyle}
                    articleBg =  {this.props.styles.articleBg}/>
                <ModalSettings
                    styles = {this.props.styles}
                    changeFontSize = {this.props.changeFontSize}
                    changeBgColor = {this.props.changeBgColor}
                    switchThemeModel = {this.props.switchThemeModel}
                    articleData = {this.props.article.articleData == null?null:this.props.article.articleData.data}
                    switchStylesModalState = {this.props.switchStylesModalState}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
    }
})

const mapStateToProps = (state) => ({
    splash: state.splash,
    article: state.article,
    styles: state.styles
})

const mapDispatchToProps = (dispatch) => ({
    todayArticle: () => {
        dispatch(todayArticle())
    },
    hideSplash: () => {
        dispatch(hideSplash())
    },
    changeFontSize: (index) => {
        dispatch(changeFontSize(index))
    },
    changeBgColor: (index) => {
        dispatch(changeBgColor(index))
    },
    switchThemeModel: () => {
        dispatch(switchThemeModel())
    },
    switchStylesModalState: (isShow)=>{
       dispatch(switchStylesModalState(isShow))
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(ArticlePage)