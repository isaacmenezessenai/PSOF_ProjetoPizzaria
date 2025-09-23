import {
    Modal as RNModal, 
    ModalProps, 
    KeyboardAvoidingView,
    View,
    Platform,
    StyleSheet,
    } from "react-native"

type PROPS = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

export const Modal = ({ isOpen, withInput, children, ...rest }: PROPS) => {
    const content = withInput ? (
        <KeyboardAvoidingView 
        style={styles.className}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View style={styles.className}>
            {children}
        </View>
    )

    return (
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            {content}
        </RNModal>
    )
}

const styles = StyleSheet.create({
    className:{
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1, 
    paddingHorizontal: 12, 
    backgroundColor: 'rgba(24, 24, 27, 0.4)', 
    }
})